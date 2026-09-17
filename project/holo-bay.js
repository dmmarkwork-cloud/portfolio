/* holo-bay — five slowly-drifting wireframe holograms, one per portfolio project.
   Registers <holo-bay>. Loads three.js lazily; degrades to a quiet notice if unavailable. */
(() => {
  const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
  const DEF_LINE = 0xFF8A52, DEF_FILL = 0x4A2413, DEF_RING = 0x7FE8F6;

  class HoloBay extends HTMLElement {
    connectedCallback() { if (this._booted) return; this._booted = true; this.boot(); }
    disconnectedCallback() {
      this._stop = true;
      if (this._ro) this._ro.disconnect();
      if (this._io) this._io.disconnect();
      if (this._renderer) this._renderer.dispose();
    }

    async boot() {
      const hex = (a, d) => {
        const v = this.getAttribute(a);
        return v ? parseInt(v.replace('#', ''), 16) : d;
      };
      const CYAN = hex('line', DEF_LINE);        // wireframe edges
      const FILL = hex('fill', DEF_FILL);        // translucent body
      const WARM = hex('ring', DEF_RING);        // pad ring
      const HOVER = hex('hover', WARM);          // edge tint on hover
      // React lowercases camelCased props onto the element, so accept both spellings
      const attr = (a, d) => this.getAttribute(a) || this.getAttribute(a.replace(/-/g, '')) || d;
      const legendFg = attr('legend-fg', '#8B96A4');
      const legendBg = attr('legend-bg', '#0B0E13');
      const legendBd = attr('legend-border', '#262C35');
      const legendOn = attr('legend-active', '#FFFFFF');
      const legendOnBd = attr('legend-active-border', '#58D7E8');
      this.style.display = 'block';
      this.style.position = 'relative';

      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%;';
      const holder = document.createElement('div');
      holder.style.cssText = 'position:relative;width:100%;height:' + (this.getAttribute('height') || '300px') + ';';
      holder.appendChild(canvas);

      const legend = document.createElement('div');
      legend.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;padding:10px 2px 0;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;";
      this.appendChild(holder);
      this.appendChild(legend);

      let THREE;
      try { THREE = await import(THREE_URL); }
      catch (e) {
        holder.innerHTML = "<div style=\"display:grid;place-items:center;height:100%;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#8B96A4;\">HOLO BAY OFFLINE</div>";
        return;
      }

      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      this._renderer = renderer;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -2000, 2000);
      camera.position.set(0, 0, 500);
      camera.lookAt(0, 0, 0);

      const mk = (geo, opts) => {
        const g = new THREE.Group();
        const fill = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
          color: FILL, transparent: true, opacity: 0.26, side: THREE.DoubleSide, depthWrite: false
        }));
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(geo, (opts && opts.angle) || 22),
          new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.92 })
        );
        g.add(fill); g.add(edges);
        return g;
      };

      const shape = (pts) => {
        const s = new THREE.Shape();
        pts.forEach((p, i) => i ? s.lineTo(p[0], p[1]) : s.moveTo(p[0], p[1]));
        s.closePath();
        return s;
      };
      const plate = (pts, thick) => new THREE.ExtrudeGeometry(shape(pts), { depth: thick, bevelEnabled: false });

      // ---- project geometry ------------------------------------------------
      const nozzle = () => {
        const g = new THREE.Group();
        const prof = [[0.42, 0], [0.42, 0.52], [0.30, 0.66], [0.155, 0.78], [0.20, 0.90], [0.30, 1.22]]
          .map((p) => new THREE.Vector2(p[0], p[1]));
        g.add(mk(new THREE.LatheGeometry(prof, 44), { angle: 28 }));
        g.add(mk(new THREE.CylinderGeometry(0.62, 0.62, 0.05, 40), { angle: 40 }));
        for (let i = 0; i < 8; i++) {
          const b = mk(new THREE.CylinderGeometry(0.035, 0.035, 0.12, 8), { angle: 40 });
          b.position.set(Math.cos(i / 8 * Math.PI * 2) * 0.52, 0.02, Math.sin(i / 8 * Math.PI * 2) * 0.52);
          g.add(b);
        }
        g.position.y = -0.6;
        return g;
      };

      const tank = () => {
        const g = new THREE.Group();
        g.add(mk(new THREE.CapsuleGeometry(0.34, 0.66, 8, 28), { angle: 26 }));
        [-0.2, 0.2].forEach((y) => {
          const band = mk(new THREE.TorusGeometry(0.345, 0.012, 6, 36), { angle: 40 });
          band.rotation.x = Math.PI / 2; band.position.y = y; g.add(band);
        });
        return g;
      };

      const aircraft = (o) => {
        const g = new THREE.Group();
        const body = mk(new THREE.CylinderGeometry(o.rear, o.fwd, o.len, 12), { angle: 34 });
        body.rotation.z = Math.PI / 2; g.add(body);
        const nose = mk(new THREE.ConeGeometry(o.fwd, o.len * 0.22, 12), { angle: 34 });
        nose.rotation.z = -Math.PI / 2; nose.position.x = o.len * 0.6; g.add(nose);

        const halfSpan = o.span / 2, ct = o.chord * o.taper;
        const wing = mk(plate([[-o.chord / 2, 0], [o.chord / 2, 0], [ct / 2, halfSpan], [-ct / 2, halfSpan]], 0.018), { angle: 30 });
        wing.rotation.x = -Math.PI / 2; wing.position.set(o.wingX, o.wingY, 0);
        const wing2 = wing.clone(); wing2.rotation.x = Math.PI / 2;
        g.add(wing, wing2);

        const th = o.span * 0.30, tc = o.chord * 0.62;
        const tail = mk(plate([[-tc / 2, 0], [tc / 2, 0], [tc * 0.3, th], [-tc * 0.3, th]], 0.014), { angle: 30 });
        tail.rotation.x = -Math.PI / 2; tail.position.set(-o.len * 0.52, 0, 0);
        const tail2 = tail.clone(); tail2.rotation.x = Math.PI / 2;
        const fin = mk(plate([[-tc / 2, 0], [tc / 2, 0], [tc * 0.2, th * 0.8], [-tc * 0.36, th * 0.8]], 0.014), { angle: 30 });
        fin.position.set(-o.len * 0.52, 0, -0.007);
        g.add(tail, tail2, fin);

        const disc = mk(new THREE.TorusGeometry(o.prop, 0.008, 6, 40), { angle: 40 });
        disc.rotation.y = Math.PI / 2; disc.position.x = o.len * 0.72;
        disc.userData.spin = 2.4; g.add(disc);

        if (o.gear) {
          [[o.len * 0.34, 0.16], [-o.len * 0.02, -0.16], [-o.len * 0.02, 0.16]].forEach((p) => {
            const leg = mk(new THREE.CylinderGeometry(0.012, 0.012, 0.16, 6), { angle: 40 });
            leg.position.set(p[0], -o.fwd - 0.08, p[1]); g.add(leg);
            const wheel = mk(new THREE.TorusGeometry(0.035, 0.012, 6, 14), { angle: 40 });
            wheel.rotation.y = Math.PI / 2; wheel.position.set(p[0], -o.fwd - 0.16, p[1]); g.add(wheel);
          });
        }
        return g;
      };

      const rotor = () => {
        const g = new THREE.Group();
        g.add(mk(new THREE.CylinderGeometry(0.13, 0.13, 0.14, 16), { angle: 34 }));
        const mast = mk(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 10), { angle: 40 });
        mast.position.y = -0.26; g.add(mast);
        for (let i = 0; i < 4; i++) {
          const bolt = mk(new THREE.CylinderGeometry(0.016, 0.016, 0.16, 6), { angle: 40 });
          bolt.position.set(Math.cos(i / 4 * Math.PI * 2) * 0.085, 0, Math.sin(i / 4 * Math.PI * 2) * 0.085);
          g.add(bolt);
        }
        [0, Math.PI].forEach((a) => {
          const arm = new THREE.Group();
          const blade = mk(plate([[0, -0.075], [0.86, -0.05], [0.86, 0.05], [0, 0.075]], 0.014), { angle: 30 });
          blade.rotation.x = -Math.PI / 2;
          blade.rotation.y = 0;
          const twist = new THREE.Group();
          twist.add(blade);
          twist.rotation.x = -0.42;              // root-to-tip pitch, held visually
          arm.add(twist);
          arm.rotation.y = a; arm.position.y = 0.01;
          g.add(arm);
        });
        return g;
      };

      // wing section with deployed slat + aileron, on its presentation post
      const wingRig = () => {
        const g = new THREE.Group();
        const c = 0.86, sp = 0.50;
        const camber = (x) => 0.13 * Math.sin(Math.PI * Math.pow(Math.max(0, Math.min(1, x)), 0.82));
        const upper = [], lower = [];
        for (let i = 0; i <= 18; i++) {
          const x = i / 18, t = 0.055 * Math.sin(Math.PI * Math.pow(x, 0.62));
          upper.push([x * c, (camber(x) + t) * c]);
          lower.unshift([x * c, (camber(x) - t) * c]);
        }
        const main = mk(plate(upper.concat(lower), sp), { angle: 18 });
        main.rotation.y = Math.PI / 2;
        main.position.set(0, 0, sp / 2);
        g.add(main);

        // leading-edge slat, translated forward and drooped
        const slatPts = [[0, 0], [0.13 * c, 0.055 * c], [0.13 * c, -0.02 * c], [0.01 * c, -0.05 * c]];
        const slat = mk(plate(slatPts, sp * 0.96), { angle: 18 });
        slat.rotation.y = Math.PI / 2;
        slat.position.set(-0.10 * c, -0.05 * c, sp * 0.48);
        slat.rotation.z = -0.34;
        g.add(slat);

        // trailing-edge aileron, deflected down, spanning the outboard half
        const ailPts = [[0, 0.018 * c], [0.24 * c, 0.004 * c], [0.24 * c, -0.004 * c], [0, -0.018 * c]];
        const ail = mk(plate(ailPts, sp * 0.44), { angle: 18 });
        ail.rotation.y = Math.PI / 2;
        ail.position.set(c * 0.985, camber(1) * c, sp * 0.24);
        ail.rotation.z = -0.42;
        g.add(ail);

        // ribs read through the open bay
        [0.18, 0.5, 0.82].forEach((f) => {
          const rib = mk(plate(upper.concat(lower), 0.006), { angle: 18 });
          rib.rotation.y = Math.PI / 2;
          rib.position.set(0, 0, sp * f);
          g.add(rib);
        });

        // post rises to meet the section's lower surface at the mount station
        const mountX = 0.42, tMount = 0.055 * Math.sin(Math.PI * Math.pow(mountX, 0.62));
        const underside = (camber(mountX) - tMount) * c;
        const postH = 0.42;
        const post = mk(new THREE.BoxGeometry(0.10, postH, 0.10), { angle: 40 });
        post.position.set(c * mountX, underside - postH / 2 + 0.01, sp / 2);
        const base = mk(new THREE.BoxGeometry(0.62, 0.035, 0.52), { angle: 40 });
        base.position.set(c * mountX, underside - postH - 0.008, sp / 2);
        g.add(post, base);

        g.position.set(-c * 0.42, 0.06, -sp / 2);
        return g;
      };

      const specs = [
        { id: '01', name: 'CD Nozzle', build: nozzle, roll: -Math.PI / 2, nudgeY: -0.47 },
        { id: '02', name: 'Propellant Tank', build: tank, roll: -Math.PI / 2 },
        { id: '03', name: 'MK-10', build: () => aircraft({ len: 0.92, fwd: 0.085, rear: 0.045, span: 1.30, chord: 0.24, taper: 0.62, wingX: 0.10, wingY: -0.05, prop: 0.20, gear: true }) },
        { id: '04', name: 'PANO-VISTA', build: () => aircraft({ len: 0.74, fwd: 0.075, rear: 0.04, span: 1.34, chord: 0.18, taper: 0.78, wingX: 0.06, wingY: 0.07, prop: 0.17, gear: true }) },
        { id: '05', name: 'Rotor', build: rotor },
        { id: '06', name: 'Wing Rig', build: wingRig }
      ];

      const items = specs.map((s, i) => {
        const pivot = new THREE.Group();
        const obj = s.build();
        // roll first, THEN recentre: every object ends up centred on its own pivot
        // origin, so all five read as sitting on one level line
        if (s.roll) obj.rotation.z = s.roll;
        obj.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(obj);
        const c = box.getCenter(new THREE.Vector3());
        obj.position.set(-c.x, -c.y, -c.z);
        const radius = box.getBoundingSphere(new THREE.Sphere()).radius || 1;
        const sz = box.getSize(new THREE.Vector3());
        if (s.nudgeY) obj.position.y += s.nudgeY * sz.y;   // trim mass-centre vs box-centre mismatch
        pivot.add(obj);
        scene.add(pivot);

        // ring lives in scene space (not on the floating pivot) so all five pads sit
        // at one height with one screen-space size, and never tumble with the object
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.92, 1, 56),
          new THREE.MeshBasicMaterial({ color: WARM, transparent: true, opacity: 0.30, side: THREE.DoubleSide, depthWrite: false })
        );
        ring.rotation.x = -Math.PI / 2 + 0.34;   // tipped toward a level camera so it always reads as an ellipse
        scene.add(ring);

        return {
          spec: s, pivot, obj, ring, radius, sz, tiltX: s.tiltX || 0,
          phase: i * 1.27, spin: 0.16 + i * 0.026, hover: 0, target: 0,
          lines: obj.children.filter((m) => m.type === 'Group').length
        };
      });

      // per-item material handles for hover tint
      items.forEach((it) => {
        it.mats = [];
        it.obj.traverse((n) => { if (n.material && n.material.color) it.mats.push(n.material); });
      });

      const chips = items.map((it) => {
        const el = document.createElement('span');
        el.style.cssText = 'padding:4px 8px;border:1px solid ' + legendBd + ';color:' + legendFg + ';background:' + legendBg + ';transition:color 180ms,border-color 180ms;';
        el.textContent = it.spec.id + ' ' + it.spec.name;
        legend.appendChild(el);
        return el;
      });

      const ray = new THREE.Raycaster();
      const pointer = new THREE.Vector2(-10, -10);
      let hovered = null;
      holder.addEventListener('pointermove', (e) => {
        const r = canvas.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      });
      holder.addEventListener('pointerleave', () => { pointer.set(-10, -10); });

      let W = 0, H = 0, cell = 0, sized = false, tries = 0;
      const layout = () => {
        const r = holder.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) {   // not mounted/measured yet — never lock a 1x1 buffer
          if (tries++ < 120) requestAnimationFrame(layout);
          return;
        }
        sized = true;
        W = Math.round(r.width); H = Math.round(r.height);
        renderer.setSize(W, H, false);
        camera.left = -W / 2; camera.right = W / 2; camera.top = H / 2; camera.bottom = -H / 2;
        camera.updateProjectionMatrix();

        const cols = W >= 700 ? 6 : (W >= 430 ? 3 : 2);
        const rows = Math.ceil(items.length / cols);
        const cw = W / cols, ch = H / rows;
        cell = Math.min(cw, ch);
        const subjectScale = parseFloat(this.getAttribute('subject-scale') || '1');
        items.forEach((it, i) => {
          const row = Math.floor(i / cols), col = i % cols;
          const inRow = Math.min(cols, items.length - row * cols);
          const rowW = inRow * cw;
          it.baseX = -rowW / 2 + (col + 0.5) * cw;
          it.baseY = H / 2 - (row + 0.5) * ch;
          // scale from the same box the recentre used, so the box center really is baseY
          // and half the object's height can never reach the panel edge
          const w = Math.max(it.sz.x, 1e-4), h = Math.max(it.sz.y, 1e-4);
          const s = Math.min((cell * 0.49) / Math.max(w, h), (cell * 0.24) / (h / 2)) * subjectScale;
          it.pivot.scale.setScalar(s);
          it.pivot.position.set(it.baseX, it.baseY, 0);
          it.ring.scale.setScalar(cell * 0.26 * subjectScale);
          it.ring.position.set(it.baseX, it.baseY - cell * 0.42, -4);
        });
      };

      this._ro = new ResizeObserver(layout);
      this._ro.observe(holder);
      this._ro.observe(this);
      layout();

      let visible = true;
      this._io = new IntersectionObserver((es) => {
        es.forEach((e) => { visible = e.isIntersecting; });
        if (visible && !sized) layout();
      }, { rootMargin: '120px' });
      this._io.observe(this);

      const clock = new THREE.Clock();
      const tick = () => {
        if (this._stop) return;
        requestAnimationFrame(tick);
        if (!visible || !sized) return;
        const t = clock.getElapsedTime();

        if (!reduced) {
          ray.setFromCamera(pointer, camera);
          const hits = ray.intersectObjects(items.map((i) => i.pivot), true);
          let now = null;
          if (hits.length) {
            let n = hits[0].object;
            while (n && !items.some((i) => i.pivot === n)) n = n.parent;
            now = items.find((i) => i.pivot === n) || null;
          }
          if (now !== hovered) {
            hovered = now;
            items.forEach((it, i) => {
              const on = it === hovered;
              chips[i].style.color = on ? legendOn : legendFg;
              chips[i].style.borderColor = on ? legendOnBd : legendBd;
              it.target = on ? 1 : 0;
            });
            this.dispatchEvent(new CustomEvent('holo-hover', {
              bubbles: true, detail: { name: hovered ? hovered.spec.name : null, id: hovered ? hovered.spec.id : null }
            }));
          }
        }

        items.forEach((it) => {
          it.hover += (it.target - it.hover) * 0.09;
          const drift = reduced ? 0 : 1;
          it.pivot.rotation.y = t * it.spin * (1 + it.hover * 1.6) + it.phase;
          it.pivot.rotation.x = it.tiltX + drift * Math.sin(t * 0.42) * 0.05;
          it.pivot.rotation.z = 0;
          it.pivot.position.y = it.baseY + drift * Math.sin(t * 0.62) * cell * 0.022 + it.hover * cell * 0.03;
          it.ring.material.opacity = 0.22 + 0.26 * it.hover + (reduced ? 0 : Math.sin(t * 1.1 + it.phase) * 0.05);
          const tint = it.hover;
          it.mats.forEach((m) => {
            if (m.color) m.color.setHex(tint > 0.5 ? HOVER : CYAN);
            if (m.opacity !== undefined && m.transparent && m.side === undefined) m.opacity = 0.92;
          });
        });

        renderer.render(scene, camera);
      };
      tick();
    }
  }

  if (!customElements.get('holo-bay')) customElements.define('holo-bay', HoloBay);
})();
