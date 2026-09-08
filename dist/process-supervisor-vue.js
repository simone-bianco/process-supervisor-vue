import { Fragment as e, Teleport as t, cloneVNode as n, computed as r, createBlock as i, createCommentVNode as a, createElementBlock as o, createElementVNode as s, createTextVNode as c, createVNode as l, defineComponent as u, guardReactiveProps as d, h as f, mergeProps as p, nextTick as m, normalizeClass as h, normalizeProps as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, openBlock as b, ref as x, renderList as S, renderSlot as C, resolveDynamicComponent as w, toDisplayString as T, unref as E, useAttrs as ee, useSlots as te, watch as D, watchEffect as O, withCtx as k, withKeys as A, withModifiers as j } from "vue";
//#region ../../../node_modules/clsx/dist/clsx.mjs
function M(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = M(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function N() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = M(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region ../../../node_modules/tailwind-merge/dist/bundle-mjs.mjs
var P = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, F = (e, t) => ({
	classGroupId: e,
	validator: t
}), I = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), L = "-", R = [], z = "arbitrary..", B = (e) => {
	let t = U(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return H(e);
			let n = e.split(L);
			return V(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? P(i, t) : t : i || R;
			}
			return n[e] || R;
		}
	};
}, V = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = V(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(L) : e.slice(t).join(L), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, H = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? z + r : void 0;
})(), U = (e) => {
	let { theme: t, classGroups: n } = e;
	return ne(n, t);
}, ne = (e, t) => {
	let n = I();
	for (let r in e) {
		let i = e[r];
		re(i, n, r, t);
	}
	return n;
}, re = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		ie(i, t, n, r);
	}
}, ie = (e, t, n, r) => {
	if (typeof e == "string") {
		ae(e, t, n);
		return;
	}
	if (typeof e == "function") {
		oe(e, t, n, r);
		return;
	}
	se(e, t, n, r);
}, ae = (e, t, n) => {
	let r = e === "" ? t : ce(t, e);
	r.classGroupId = n;
}, oe = (e, t, n, r) => {
	if (le(e)) {
		re(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(F(n, e));
}, se = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		re(o, ce(t, a), n, r);
	}
}, ce = (e, t) => {
	let n = e, r = t.split(L), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = I(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, le = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, W = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, ue = "!", de = ":", fe = [], pe = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), me = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === de) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(ue) ? (c = s.slice(0, -1), l = !0) : s.startsWith(ue) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return pe(t, l, c, u);
	};
	if (t) {
		let e = t + de, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : pe(fe, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, he = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, ge = (e) => ({
	cache: W(e.cacheSize),
	parseClassName: me(e),
	sortModifiers: he(e),
	postfixLookupClassGroupIds: _e(e),
	...B(e)
}), _e = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, ve = /\s+/, ye = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(ve), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + ue : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, be = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = xe(n)) && (i && (i += " "), i += r);
	return i;
}, xe = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = xe(e[r])) && (n && (n += " "), n += t);
	return n;
}, Se = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = ge(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = ye(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(be(...e));
}, Ce = [], G = (e) => {
	let t = (t) => t[e] || Ce;
	return t.isThemeGetter = !0, t;
}, we = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Te = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ee = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, De = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Oe = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ke = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ae = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, je = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Me = (e) => Ee.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), q = (e) => !!e && Number.isInteger(Number(e)), Ne = (e) => e.endsWith("%") && K(e.slice(0, -1)), J = (e) => De.test(e), Pe = () => !0, Fe = (e) => Oe.test(e) && !ke.test(e), Ie = () => !1, Le = (e) => Ae.test(e), Re = (e) => je.test(e), ze = (e) => !Y(e) && !X(e), Be = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Ve = (e) => nt(e, ot, Ie), Y = (e) => we.test(e), He = (e) => nt(e, st, Fe), Ue = (e) => nt(e, ct, K), We = (e) => nt(e, ut, Pe), Ge = (e) => nt(e, lt, Ie), Ke = (e) => nt(e, it, Ie), qe = (e) => nt(e, at, Re), Je = (e) => nt(e, dt, Le), X = (e) => Te.test(e), Ye = (e) => rt(e, st), Xe = (e) => rt(e, lt), Ze = (e) => rt(e, it), Qe = (e) => rt(e, ot), $e = (e) => rt(e, at), et = (e) => rt(e, dt, !0), tt = (e) => rt(e, ut, !0), nt = (e, t, n) => {
	let r = we.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, rt = (e, t, n = !1) => {
	let r = Te.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, it = (e) => e === "position" || e === "percentage", at = (e) => e === "image" || e === "url", ot = (e) => e === "length" || e === "size" || e === "bg-size", st = (e) => e === "length", ct = (e) => e === "number", lt = (e) => e === "family-name", ut = (e) => e === "number" || e === "weight", dt = (e) => e === "shadow", ft = /*#__PURE__*/ Se(() => {
	let e = G("color"), t = G("font"), n = G("text"), r = G("font-weight"), i = G("tracking"), a = G("leading"), o = G("breakpoint"), s = G("container"), c = G("spacing"), l = G("radius"), u = G("shadow"), d = G("inset-shadow"), f = G("text-shadow"), p = G("drop-shadow"), m = G("blur"), h = G("perspective"), g = G("aspect"), _ = G("ease"), v = G("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		X,
		Y
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		X,
		Y,
		c
	], T = () => [
		Me,
		"full",
		"auto",
		...w()
	], E = () => [
		q,
		"none",
		"subgrid",
		X,
		Y
	], ee = () => [
		"auto",
		{ span: [
			"full",
			q,
			X,
			Y
		] },
		q,
		X,
		Y
	], te = () => [
		q,
		"auto",
		X,
		Y
	], D = () => [
		"auto",
		"min",
		"max",
		"fr",
		X,
		Y
	], O = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], k = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], A = () => ["auto", ...w()], j = () => [
		Me,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], M = () => [
		Me,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], N = () => [
		Me,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		e,
		X,
		Y
	], F = () => [
		...b(),
		Ze,
		Ke,
		{ position: [X, Y] }
	], I = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], L = () => [
		"auto",
		"cover",
		"contain",
		Qe,
		Ve,
		{ size: [X, Y] }
	], R = () => [
		Ne,
		Ye,
		He
	], z = () => [
		"",
		"none",
		"full",
		l,
		X,
		Y
	], B = () => [
		"",
		K,
		Ye,
		He
	], V = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], H = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], U = () => [
		K,
		Ne,
		Ze,
		Ke
	], ne = () => [
		"",
		"none",
		m,
		X,
		Y
	], re = () => [
		"none",
		K,
		X,
		Y
	], ie = () => [
		"none",
		K,
		X,
		Y
	], ae = () => [
		K,
		X,
		Y
	], oe = () => [
		Me,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [J],
			breakpoint: [J],
			color: [Pe],
			container: [J],
			"drop-shadow": [J],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [ze],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [J],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [J],
			shadow: [J],
			spacing: ["px", K],
			text: [J],
			"text-shadow": [J],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Me,
				Y,
				X,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				X,
				Y
			] }],
			"container-named": [Be],
			columns: [{ columns: [
				K,
				Y,
				X,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				q,
				"auto",
				X,
				Y
			] }],
			basis: [{ basis: [
				Me,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				K,
				Me,
				"auto",
				"initial",
				"none",
				Y
			] }],
			grow: [{ grow: [
				"",
				K,
				X,
				Y
			] }],
			shrink: [{ shrink: [
				"",
				K,
				X,
				Y
			] }],
			order: [{ order: [
				q,
				"first",
				"last",
				"none",
				X,
				Y
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: ee() }],
			"col-start": [{ "col-start": te() }],
			"col-end": [{ "col-end": te() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: ee() }],
			"row-start": [{ "row-start": te() }],
			"row-end": [{ "row-end": te() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": D() }],
			"auto-rows": [{ "auto-rows": D() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...O(), "normal"] }],
			"justify-items": [{ "justify-items": [...k(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...k()] }],
			"align-content": [{ content: ["normal", ...O()] }],
			"align-items": [{ items: [...k(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...k(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": O() }],
			"place-items": [{ "place-items": [...k(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...k()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: A() }],
			mx: [{ mx: A() }],
			my: [{ my: A() }],
			ms: [{ ms: A() }],
			me: [{ me: A() }],
			mbs: [{ mbs: A() }],
			mbe: [{ mbe: A() }],
			mt: [{ mt: A() }],
			mr: [{ mr: A() }],
			mb: [{ mb: A() }],
			ml: [{ ml: A() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: j() }],
			"inline-size": [{ inline: ["auto", ...M()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...M()] }],
			"max-inline-size": [{ "max-inline": ["none", ...M()] }],
			"block-size": [{ block: ["auto", ...N()] }],
			"min-block-size": [{ "min-block": ["auto", ...N()] }],
			"max-block-size": [{ "max-block": ["none", ...N()] }],
			w: [{ w: [
				s,
				"screen",
				...j()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...j()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...j()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...j()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...j()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...j()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Ye,
				He
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				tt,
				We
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				Ne,
				Y
			] }],
			"font-family": [{ font: [
				Xe,
				Ge,
				t
			] }],
			"font-features": [{ "font-features": [Y] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				X,
				Y
			] }],
			"line-clamp": [{ "line-clamp": [
				K,
				"none",
				X,
				Ue
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				X,
				Y
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				X,
				Y
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: P() }],
			"text-color": [{ text: P() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...V(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				K,
				"from-font",
				"auto",
				X,
				He
			] }],
			"text-decoration-color": [{ decoration: P() }],
			"underline-offset": [{ "underline-offset": [
				K,
				"auto",
				X,
				Y
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				q,
				X,
				Y
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				X,
				Y
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				X,
				Y
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: F() }],
			"bg-repeat": [{ bg: I() }],
			"bg-size": [{ bg: L() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						q,
						X,
						Y
					],
					radial: [
						"",
						X,
						Y
					],
					conic: [
						q,
						X,
						Y
					]
				},
				$e,
				qe
			] }],
			"bg-color": [{ bg: P() }],
			"gradient-from-pos": [{ from: R() }],
			"gradient-via-pos": [{ via: R() }],
			"gradient-to-pos": [{ to: R() }],
			"gradient-from": [{ from: P() }],
			"gradient-via": [{ via: P() }],
			"gradient-to": [{ to: P() }],
			rounded: [{ rounded: z() }],
			"rounded-s": [{ "rounded-s": z() }],
			"rounded-e": [{ "rounded-e": z() }],
			"rounded-t": [{ "rounded-t": z() }],
			"rounded-r": [{ "rounded-r": z() }],
			"rounded-b": [{ "rounded-b": z() }],
			"rounded-l": [{ "rounded-l": z() }],
			"rounded-ss": [{ "rounded-ss": z() }],
			"rounded-se": [{ "rounded-se": z() }],
			"rounded-ee": [{ "rounded-ee": z() }],
			"rounded-es": [{ "rounded-es": z() }],
			"rounded-tl": [{ "rounded-tl": z() }],
			"rounded-tr": [{ "rounded-tr": z() }],
			"rounded-br": [{ "rounded-br": z() }],
			"rounded-bl": [{ "rounded-bl": z() }],
			"border-w": [{ border: B() }],
			"border-w-x": [{ "border-x": B() }],
			"border-w-y": [{ "border-y": B() }],
			"border-w-s": [{ "border-s": B() }],
			"border-w-e": [{ "border-e": B() }],
			"border-w-bs": [{ "border-bs": B() }],
			"border-w-be": [{ "border-be": B() }],
			"border-w-t": [{ "border-t": B() }],
			"border-w-r": [{ "border-r": B() }],
			"border-w-b": [{ "border-b": B() }],
			"border-w-l": [{ "border-l": B() }],
			"divide-x": [{ "divide-x": B() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": B() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...V(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...V(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: P() }],
			"border-color-x": [{ "border-x": P() }],
			"border-color-y": [{ "border-y": P() }],
			"border-color-s": [{ "border-s": P() }],
			"border-color-e": [{ "border-e": P() }],
			"border-color-bs": [{ "border-bs": P() }],
			"border-color-be": [{ "border-be": P() }],
			"border-color-t": [{ "border-t": P() }],
			"border-color-r": [{ "border-r": P() }],
			"border-color-b": [{ "border-b": P() }],
			"border-color-l": [{ "border-l": P() }],
			"divide-color": [{ divide: P() }],
			"outline-style": [{ outline: [
				...V(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				K,
				X,
				Y
			] }],
			"outline-w": [{ outline: [
				"",
				K,
				Ye,
				He
			] }],
			"outline-color": [{ outline: P() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				et,
				Je
			] }],
			"shadow-color": [{ shadow: P() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				et,
				Je
			] }],
			"inset-shadow-color": [{ "inset-shadow": P() }],
			"ring-w": [{ ring: B() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: P() }],
			"ring-offset-w": [{ "ring-offset": [K, He] }],
			"ring-offset-color": [{ "ring-offset": P() }],
			"inset-ring-w": [{ "inset-ring": B() }],
			"inset-ring-color": [{ "inset-ring": P() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				et,
				Je
			] }],
			"text-shadow-color": [{ "text-shadow": P() }],
			opacity: [{ opacity: [
				K,
				X,
				Y
			] }],
			"mix-blend": [{ "mix-blend": [
				...H(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": H() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [K] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": U() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": U() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": P() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": P() }],
			"mask-image-t-from-pos": [{ "mask-t-from": U() }],
			"mask-image-t-to-pos": [{ "mask-t-to": U() }],
			"mask-image-t-from-color": [{ "mask-t-from": P() }],
			"mask-image-t-to-color": [{ "mask-t-to": P() }],
			"mask-image-r-from-pos": [{ "mask-r-from": U() }],
			"mask-image-r-to-pos": [{ "mask-r-to": U() }],
			"mask-image-r-from-color": [{ "mask-r-from": P() }],
			"mask-image-r-to-color": [{ "mask-r-to": P() }],
			"mask-image-b-from-pos": [{ "mask-b-from": U() }],
			"mask-image-b-to-pos": [{ "mask-b-to": U() }],
			"mask-image-b-from-color": [{ "mask-b-from": P() }],
			"mask-image-b-to-color": [{ "mask-b-to": P() }],
			"mask-image-l-from-pos": [{ "mask-l-from": U() }],
			"mask-image-l-to-pos": [{ "mask-l-to": U() }],
			"mask-image-l-from-color": [{ "mask-l-from": P() }],
			"mask-image-l-to-color": [{ "mask-l-to": P() }],
			"mask-image-x-from-pos": [{ "mask-x-from": U() }],
			"mask-image-x-to-pos": [{ "mask-x-to": U() }],
			"mask-image-x-from-color": [{ "mask-x-from": P() }],
			"mask-image-x-to-color": [{ "mask-x-to": P() }],
			"mask-image-y-from-pos": [{ "mask-y-from": U() }],
			"mask-image-y-to-pos": [{ "mask-y-to": U() }],
			"mask-image-y-from-color": [{ "mask-y-from": P() }],
			"mask-image-y-to-color": [{ "mask-y-to": P() }],
			"mask-image-radial": [{ "mask-radial": [X, Y] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": U() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": U() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": P() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": P() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [K] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": U() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": U() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": P() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": P() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: F() }],
			"mask-repeat": [{ mask: I() }],
			"mask-size": [{ mask: L() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				X,
				Y
			] }],
			filter: [{ filter: [
				"",
				"none",
				X,
				Y
			] }],
			blur: [{ blur: ne() }],
			brightness: [{ brightness: [
				K,
				X,
				Y
			] }],
			contrast: [{ contrast: [
				K,
				X,
				Y
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				et,
				Je
			] }],
			"drop-shadow-color": [{ "drop-shadow": P() }],
			grayscale: [{ grayscale: [
				"",
				K,
				X,
				Y
			] }],
			"hue-rotate": [{ "hue-rotate": [
				K,
				X,
				Y
			] }],
			invert: [{ invert: [
				"",
				K,
				X,
				Y
			] }],
			saturate: [{ saturate: [
				K,
				X,
				Y
			] }],
			sepia: [{ sepia: [
				"",
				K,
				X,
				Y
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				X,
				Y
			] }],
			"backdrop-blur": [{ "backdrop-blur": ne() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				K,
				X,
				Y
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				K,
				X,
				Y
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				K,
				X,
				Y
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				K,
				X,
				Y
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				K,
				X,
				Y
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				K,
				X,
				Y
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				K,
				X,
				Y
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				K,
				X,
				Y
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				X,
				Y
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				K,
				"initial",
				X,
				Y
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				X,
				Y
			] }],
			delay: [{ delay: [
				K,
				X,
				Y
			] }],
			animate: [{ animate: [
				"none",
				v,
				X,
				Y
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				X,
				Y
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: re() }],
			"rotate-x": [{ "rotate-x": re() }],
			"rotate-y": [{ "rotate-y": re() }],
			"rotate-z": [{ "rotate-z": re() }],
			scale: [{ scale: ie() }],
			"scale-x": [{ "scale-x": ie() }],
			"scale-y": [{ "scale-y": ie() }],
			"scale-z": [{ "scale-z": ie() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ae() }],
			"skew-x": [{ "skew-x": ae() }],
			"skew-y": [{ "skew-y": ae() }],
			transform: [{ transform: [
				X,
				Y,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: oe() }],
			"translate-x": [{ "translate-x": oe() }],
			"translate-y": [{ "translate-y": oe() }],
			"translate-z": [{ "translate-z": oe() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				q,
				X,
				Y
			] }],
			accent: [{ accent: P() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: P() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				X,
				Y
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": P() }],
			"scrollbar-track-color": [{ "scrollbar-track": P() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				X,
				Y
			] }],
			fill: [{ fill: ["none", ...P()] }],
			"stroke-w": [{ stroke: [
				K,
				Ye,
				He,
				Ue
			] }],
			stroke: [{ stroke: ["none", ...P()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region ../vue-ui-core/dist/index.js
function pt(...e) {
	return ft(N(e));
}
//#endregion
//#region ../vue-ui-components/dist/utils.js
function Z() {
	return Reflect.apply(pt, void 0, arguments);
}
//#endregion
//#region ../vue-ui-components/dist/vue-ui-components.js
var mt = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, ht = (e) => e === "", gt = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), _t = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), vt = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), yt = (e) => {
	let t = vt(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, bt = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, xt = ({ name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": r, strokeWidth: i, "stroke-width": a, size: o = bt.width, color: s = bt.stroke, ...c }, { slots: l }) => f("svg", {
	...bt,
	...c,
	width: o,
	height: o,
	stroke: s,
	"stroke-width": ht(n) || ht(r) || n === !0 || r === !0 ? Number(i || a || bt["stroke-width"]) * 24 / Number(o) : i || a || bt["stroke-width"],
	class: gt("lucide", c.class, ...e ? [`lucide-${_t(yt(e))}-icon`, `lucide-${_t(e)}`] : ["lucide-icon"]),
	...!l.default && !mt(c) && { "aria-hidden": "true" }
}, [...t.map((e) => f(...e)), ...l.default ? [l.default()] : []]), Q = (e, t) => (n, { slots: r, attrs: i }) => f(xt, {
	...i,
	...n,
	iconNode: t,
	name: e
}, r), St = Q("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), Ct = Q("archive", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
		key: "1s80jp"
	}],
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}]
]), wt = Q("arrow-down-a-z", [
	["path", {
		d: "m3 16 4 4 4-4",
		key: "1co6wj"
	}],
	["path", {
		d: "M7 20V4",
		key: "1yoxec"
	}],
	["path", {
		d: "M20 8h-5",
		key: "1vsyxs"
	}],
	["path", {
		d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10",
		key: "ag13bf"
	}],
	["path", {
		d: "M15 14h5l-5 6h5",
		key: "ur5jdg"
	}]
]), Tt = Q("arrow-down", [["path", {
	d: "M12 5v14",
	key: "s699le"
}], ["path", {
	d: "m19 12-7 7-7-7",
	key: "1idqje"
}]]), Et = Q("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), Dt = Q("arrow-up-down", [
	["path", {
		d: "m21 16-4 4-4-4",
		key: "f6ql7i"
	}],
	["path", {
		d: "M17 20V4",
		key: "1ejh1v"
	}],
	["path", {
		d: "m3 8 4-4 4 4",
		key: "11wl7u"
	}],
	["path", {
		d: "M7 4v16",
		key: "1glfcx"
	}]
]), Ot = Q("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]), kt = Q("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]), At = Q("braces", [["path", {
	d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
	key: "ezmyqa"
}], ["path", {
	d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
	key: "e1hn23"
}]]), jt = Q("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]), Mt = Q("chart-no-axes-column", [
	["path", {
		d: "M5 21v-6",
		key: "1hz6c0"
	}],
	["path", {
		d: "M12 21V3",
		key: "1lcnhd"
	}],
	["path", {
		d: "M19 21V9",
		key: "unv183"
	}]
]), Nt = Q("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), Pt = Q("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), Ft = Q("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), It = Q("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), Lt = Q("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]), Rt = Q("circle-check-big", [["path", {
	d: "M21.801 10A10 10 0 1 1 17 3.335",
	key: "yps3ct"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]), zt = Q("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), Bt = Q("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), Vt = Q("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]), Ht = Q("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), Ut = Q("clock", [["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), Wt = Q("cloud-upload", [
	["path", {
		d: "M12 13v8",
		key: "1l5pq0"
	}],
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "m8 17 4-4 4 4",
		key: "1quai1"
	}]
]), Gt = Q("code", [["path", {
	d: "m16 18 6-6-6-6",
	key: "eg8j8"
}], ["path", {
	d: "m8 6-6 6 6 6",
	key: "ppft3o"
}]]), Kt = Q("component", [
	["path", {
		d: "M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
		key: "1uwlt4"
	}],
	["path", {
		d: "M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",
		key: "10291m"
	}],
	["path", {
		d: "M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",
		key: "1tqoq1"
	}],
	["path", {
		d: "M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
		key: "1x6lto"
	}]
]), qt = Q("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]), Jt = Q("credit-card", [["rect", {
	width: "20",
	height: "14",
	x: "2",
	y: "5",
	rx: "2",
	key: "ynyp8z"
}], ["line", {
	x1: "2",
	x2: "22",
	y1: "10",
	y2: "10",
	key: "1b3vmo"
}]]), Yt = Q("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]), Xt = Q("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]), Zt = Q("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]), Qt = Q("file", [["path", {
	d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	key: "1oefj6"
}], ["path", {
	d: "M14 2v5a1 1 0 0 0 1 1h5",
	key: "wfsgrz"
}]]), $t = Q("folder-open", [["path", {
	d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	key: "usdka0"
}]]), en = Q("folder-plus", [
	["path", {
		d: "M12 10v6",
		key: "1bos4e"
	}],
	["path", {
		d: "M9 13h6",
		key: "1uhe8q"
	}],
	["path", {
		d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
		key: "1kt360"
	}]
]), tn = Q("folder", [["path", {
	d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	key: "1kt360"
}]]), nn = Q("funnel", [["path", {
	d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
	key: "sc7q7i"
}]]), rn = Q("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]), an = Q("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]), on = Q("inbox", [["polyline", {
	points: "22 12 16 12 14 15 10 15 8 12 2 12",
	key: "o97t9d"
}], ["path", {
	d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
	key: "oot6mr"
}]]), sn = Q("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), cn = Q("layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]), ln = Q("layout-dashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]), un = Q("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), dn = Q("log-out", [
	["path", {
		d: "m16 17 5-5-5-5",
		key: "1bji2h"
	}],
	["path", {
		d: "M21 12H9",
		key: "dn1m92"
	}],
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}]
]), fn = Q("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]), pn = Q("music", [
	["path", {
		d: "M9 18V5l12-2v13",
		key: "1jmyc2"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}],
	["circle", {
		cx: "18",
		cy: "16",
		r: "3",
		key: "1hluhg"
	}]
]), mn = Q("palette", [
	["path", {
		d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
		key: "e79jfc"
	}],
	["circle", {
		cx: "13.5",
		cy: "6.5",
		r: ".5",
		fill: "currentColor",
		key: "1okk4w"
	}],
	["circle", {
		cx: "17.5",
		cy: "10.5",
		r: ".5",
		fill: "currentColor",
		key: "f64h9f"
	}],
	["circle", {
		cx: "6.5",
		cy: "12.5",
		r: ".5",
		fill: "currentColor",
		key: "qy21gx"
	}],
	["circle", {
		cx: "8.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "fotxhn"
	}]
]), hn = Q("panel-left-open", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}],
	["path", {
		d: "m14 9 3 3-3 3",
		key: "8010ee"
	}]
]), gn = Q("pen", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}]]), _n = Q("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), vn = Q("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]), yn = Q("rotate-cw", [["path", {
	d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
	key: "1p45f6"
}], ["path", {
	d: "M21 3v5h-5",
	key: "1q7to0"
}]]), bn = Q("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), xn = Q("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), Sn = Q("shield", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}]]), Cn = Q("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]), wn = Q("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]), Tn = Q("table", [
	["path", {
		d: "M12 3v18",
		key: "108xh3"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}],
	["path", {
		d: "M3 15h18",
		key: "5xshup"
	}]
]), En = Q("tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]), Dn = Q("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]), On = Q("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]), kn = Q("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), An = Q("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]), jn = Q("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]), Mn = Q("users", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["path", {
		d: "M16 3.128a4 4 0 0 1 0 7.744",
		key: "16gr8j"
	}],
	["path", {
		d: "M22 21v-2a4 4 0 0 0-3-3.87",
		key: "kshegd"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}]
]), Nn = Q("video", [["path", {
	d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	key: "ftymec"
}], ["rect", {
	x: "2",
	y: "6",
	width: "14",
	height: "12",
	rx: "2",
	key: "158x01"
}]]), Pn = Q("wand-sparkles", [
	["path", {
		d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
		key: "ul74o6"
	}],
	["path", {
		d: "m14 7 3 3",
		key: "1r5n42"
	}],
	["path", {
		d: "M5 6v4",
		key: "ilb8ba"
	}],
	["path", {
		d: "M19 14v4",
		key: "blhpug"
	}],
	["path", {
		d: "M10 2v2",
		key: "7u0qdc"
	}],
	["path", {
		d: "M7 8H3",
		key: "zfb6yr"
	}],
	["path", {
		d: "M21 16h-4",
		key: "1cnmox"
	}],
	["path", {
		d: "M11 3H9",
		key: "1obp7u"
	}]
]), Fn = Q("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), In = {
	plus: _n,
	x: Fn,
	"file-text": Zt,
	"arrow-left": Et,
	search: bn,
	settings: xn,
	"chevron-down": Pt,
	"chevron-right": It,
	"chevron-up": Ft,
	"alert-triangle": kn,
	"loader-2": un,
	loader: un,
	"folder-open": $t,
	braces: At,
	upload: An,
	"edit-2": gn,
	edit: gn,
	"trash-2": Dn,
	trash: Dn,
	check: Nt,
	"refresh-cw": vn,
	refresh: vn,
	calendar: jt,
	tag: En,
	"check-circle": Rt,
	"check-circle-2": zt,
	"x-circle": Vt,
	"alert-circle": Lt,
	info: sn,
	circle: Ht,
	"layout-dashboard": ln,
	dashboard: ln,
	folder: tn,
	component: Kt,
	palette: mn,
	download: Yt,
	"upload-cloud": Wt,
	"rotate-cw": yn,
	sparkles: Cn,
	"wand-sparkles": Pn,
	filter: nn,
	"log-out": dn,
	logout: dn,
	user: jn,
	"external-link": Xt,
	copy: qt,
	file: Qt,
	image: an,
	video: Nn,
	music: pn,
	table: Tn,
	archive: Ct,
	code: Gt,
	"arrow-down-a-z": wt,
	"arrow-up-down": Dt,
	"cloud-upload": Wt,
	"panel-left-open": hn,
	clock: Ut,
	"trending-up": On,
	activity: St,
	zap: Q("zap", [["path", {
		d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
		key: "1xq2db"
	}]]),
	bell: kt,
	"help-circle": Bt,
	help: Bt,
	"folder-plus": en,
	inbox: on,
	layers: cn,
	minus: fn,
	home: rn,
	star: wn,
	"credit-card": Jt,
	users: Mn,
	"bar-chart-2": Mt,
	shield: Sn
}, Ln = /* @__PURE__ */ new Map();
function Rn(e) {
	return typeof e == "string" ? Ln.get(e) || (e.startsWith("mdi-") ? null : In[e] ?? null) : e;
}
function zn() {
	return { render() {
		return f("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2"
		}, [
			f("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			f("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
			f("line", {
				x1: "12",
				y1: "17",
				x2: "12.01",
				y2: "17"
			})
		]);
	} };
}
var Bn = /* @__PURE__ */ u({
	__name: "Icon",
	props: {
		icon: {},
		size: { default: void 0 },
		filled: {
			type: Boolean,
			default: !1
		},
		class: { default: "" },
		ui: { default: () => ({}) }
	},
	setup(e) {
		let t = e, n = r(() => Rn(t.icon) ?? zn()), a = r(() => t.ui.rootStyle), o = r(() => {
			if (!t.size) return {};
			let e = typeof t.size == "number" ? `${t.size}px` : t.size;
			return {
				width: e,
				height: e
			};
		});
		return (r, s) => (b(), i(w(n.value), {
			fill: e.filled ? "currentColor" : "none",
			stroke: e.filled ? "none" : "currentColor",
			"stroke-width": e.filled ? 0 : void 0,
			class: h(E(Z)("icon-component", t.class, e.ui.root)),
			style: _([o.value, a.value])
		}, null, 8, [
			"fill",
			"stroke",
			"stroke-width",
			"class",
			"style"
		]));
	}
}), Vn = /* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "Tooltip",
	props: {
		text: { default: void 0 },
		position: { default: "top" },
		delay: { default: 500 },
		disabled: {
			type: Boolean,
			default: !1
		},
		ui: { default: () => ({}) }
	},
	setup(u) {
		let d = null, f = u, g = ee(), S = te(), w = x(!1), O = x(!1), k = x(!1), A = x(null), j = x(null), M = x({
			top: 0,
			left: 0
		}), N = null, P = null, F = r(() => !!(f.text || S.content));
		function I() {
			N &&= (clearTimeout(N), null), P &&= (clearTimeout(P), null), w.value = !1, O.value = !1, d === I && (d = null);
		}
		function L() {
			f.disabled || !F.value || (d && d !== I && d(), P &&= (clearTimeout(P), null), N = setTimeout(() => {
				w.value = !0, d = I;
			}, f.delay));
		}
		function R() {
			N &&= (clearTimeout(N), null), P = setTimeout(() => {
				w.value = !1, O.value = !1, d === I && (d = null);
			}, 100);
		}
		function z(e) {
			try {
				e.target?.matches?.(":focus-visible") && L();
			} catch {}
		}
		function B() {
			R();
		}
		y(() => {
			k.value = !0;
		}), v(() => {
			I();
		});
		async function V() {
			await m();
			let e = A.value?.$el ?? A.value;
			if (!e || !j.value) return;
			let t = e.getBoundingClientRect(), n = j.value.getBoundingClientRect(), r = window.innerWidth, i = window.innerHeight, a = 0, o = 0;
			switch (f.position) {
				case "top":
					a = t.top - n.height - 8, o = t.left + (t.width - n.width) / 2;
					break;
				case "bottom":
					a = t.bottom + 8, o = t.left + (t.width - n.width) / 2;
					break;
				case "left":
					a = t.top + (t.height - n.height) / 2, o = t.left - n.width - 8;
					break;
				case "right": a = t.top + (t.height - n.height) / 2, o = t.right + 8;
			}
			o = Math.max(8, Math.min(o, r - n.width - 8)), a = Math.max(8, Math.min(a, i - n.height - 8)), M.value = {
				top: a,
				left: o
			}, requestAnimationFrame(() => {
				O.value = !0;
			});
		}
		D(w, (e) => {
			e && (O.value = !1, V());
		}), D(() => f.disabled, (e) => {
			e && (w.value = !1, O.value = !1);
		});
		let H = r(() => {
			let e = {
				top: "bottom-[-4px] left-1/2 -translate-x-1/2 rotate-45",
				bottom: "top-[-4px] left-1/2 -translate-x-1/2 rotate-45",
				left: "right-[-4px] top-1/2 -translate-y-1/2 rotate-45",
				right: "left-[-4px] top-1/2 -translate-y-1/2 rotate-45"
			};
			return e[f.position] || e.top;
		});
		function U() {
			let e = S.default?.();
			return e?.[0] ? n(e[0], p(g, {
				ref: A,
				onMouseenter: L,
				onMouseleave: R,
				onFocusin: z,
				onFocusout: B,
				onClick: I
			})) : null;
		}
		return (n, r) => (b(), o(e, null, [l(U), k.value ? (b(), i(t, {
			key: 0,
			to: "body"
		}, [w.value && F.value ? (b(), o("div", {
			key: 0,
			ref_key: "tooltipEl",
			ref: j,
			role: "tooltip",
			class: h(E(Z)("fixed max-w-xs rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-pre-line shadow-lg", "bg-ui-foreground text-ui-background", "pointer-events-none", u.ui.content)),
			style: _({
				top: `${M.value.top}px`,
				left: `${M.value.left}px`,
				zIndex: 9999,
				visibility: O.value ? "visible" : "hidden",
				...typeof u.ui.contentStyle == "object" ? u.ui.contentStyle : {}
			})
		}, [C(n.$slots, "content", { text: u.text }, () => [c(T(u.text), 1)]), s("div", {
			class: h(E(Z)("absolute h-2 w-2 bg-ui-foreground", H.value, u.ui.arrow)),
			style: _(u.ui.arrowStyle)
		}, null, 6)], 6)) : a("", !0)])) : a("", !0)], 64));
	}
}), Hn = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
};
function $(e) {
	return e;
}
var Un = [
	"type",
	"disabled",
	"aria-busy"
], Wn = {
	key: 2,
	class: "absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
}, Gn = /*#__PURE__*/ Hn(/* @__PURE__ */ u({
	inheritAttrs: !1,
	__name: "Button",
	props: {
		type: { default: "button" },
		variant: { default: "primary" },
		size: { default: "md" },
		compact: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		icon: { default: void 0 },
		iconFilled: {
			type: Boolean,
			default: !1
		},
		iconPosition: { default: "left" },
		label: { default: void 0 },
		bgColor: { default: void 0 },
		textColor: { default: void 0 },
		ui: { default: () => ({}) },
		gradient: { default: void 0 },
		tooltip: { default: void 0 },
		tooltipLoading: { default: void 0 },
		tooltipDisabled: { default: void 0 }
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let l = ee(), f = u({
			name: "ButtonPassthrough",
			inheritAttrs: !1,
			setup(e, { attrs: t, slots: r }) {
				return () => {
					let e = r.default?.()[0];
					return e ? n(e, t) : null;
				};
			}
		}), p = e, m = t;
		function v(e) {
			m("click", e);
		}
		let y = r(() => {
			if (p.gradient) return Z("border-transparent bg-linear-to-r text-white hover:opacity-90 shadow-lg", p.gradient);
			let e = {
				primary: "border-transparent bg-ui-primary text-ui-primary-foreground hover:bg-ui-primary-hover focus:ring-ui-ring shadow-[0_0_10px_rgb(var(--ui-glow)/0.3)]",
				secondary: "bg-ui-secondary text-ui-secondary-foreground border border-ui-border hover:bg-ui-secondary-hover focus:ring-ui-ring",
				success: "border-transparent bg-ui-success text-ui-success-foreground hover:opacity-90 font-semibold focus:ring-ui-ring",
				danger: "border-transparent bg-ui-destructive text-ui-destructive-foreground hover:bg-ui-destructive-hover focus:ring-ui-ring active:opacity-90",
				warning: "border-transparent bg-ui-warning text-ui-warning-foreground hover:opacity-90 font-semibold focus:ring-ui-ring",
				ghost: "border-transparent bg-transparent text-ui-muted-foreground hover:text-ui-foreground hover:bg-ui-secondary focus:ring-ui-ring",
				link: "border-transparent bg-transparent text-ui-primary hover:underline focus:ring-ui-ring p-0 h-auto"
			};
			return e[p.variant] || e.primary;
		}), x = r(() => {
			if (p.compact) return "h-8 px-2 py-0 text-xs";
			let e = {
				sm: "px-2.5 py-1.5 text-xs",
				md: "px-4 py-2 text-sm",
				lg: "px-6 py-3 text-base"
			};
			return e[p.size] || e.md;
		}), S = r(() => p.disabled && p.tooltipDisabled ? p.tooltipDisabled : p.loading && p.tooltipLoading ? p.tooltipLoading : p.tooltip), D = r(() => !!S.value), O = r(() => D.value ? Vn : f), A = r(() => D.value ? {
			text: S.value,
			ui: p.ui.tooltip,
			disabled: !1
		} : {}), j = r(() => ({
			...A.value,
			...l
		})), M = te(), N = r(() => !p.label && !M.default ? "" : p.iconPosition === "right" ? "ml-2" : "mr-2"), P = r(() => ({
			...p.bgColor ? { backgroundColor: p.bgColor } : {},
			...p.textColor ? { color: p.textColor } : {}
		})), F = r(() => [P.value, $(p.ui.rootStyle)]), I = r(() => Z("inline-flex items-center justify-center font-medium rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ui-background disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 ease-in-out cursor-pointer", y.value, x.value, p.loading ? "relative overflow-hidden" : "", p.ui.root));
		return (t, n) => (b(), i(w(O.value), g(d(j.value)), {
			content: k(({ text: n }) => [C(t.$slots, "tooltip", {
				text: n,
				loading: e.loading,
				disabled: e.disabled
			}, () => [c(T(n), 1)], !0)]),
			default: k(() => [s("button", {
				type: e.type,
				disabled: e.disabled || e.loading,
				"aria-busy": e.loading || void 0,
				class: h(I.value),
				style: _(F.value),
				onClick: v
			}, [
				e.icon && e.iconPosition === "left" ? (b(), i(Bn, {
					key: 0,
					icon: e.icon,
					filled: e.iconFilled,
					ui: { root: E(Z)("h-4 w-4", N.value, e.ui.icon) },
					style: _(E($)(e.ui.iconStyle))
				}, null, 8, [
					"icon",
					"filled",
					"ui",
					"style"
				])) : a("", !0),
				s("span", {
					class: h(E(Z)("inline-flex items-center", e.loading ? "opacity-60 transition-opacity duration-200" : "", e.ui.content)),
					style: _(E($)(e.ui.contentStyle))
				}, [c(T(e.label), 1), C(t.$slots, "default", {}, void 0, !0)], 6),
				e.icon && e.iconPosition === "right" ? (b(), i(Bn, {
					key: 1,
					icon: e.icon,
					filled: e.iconFilled,
					ui: { root: E(Z)("h-4 w-4", N.value, e.ui.icon) },
					style: _(E($)(e.ui.iconStyle))
				}, null, 8, [
					"icon",
					"filled",
					"ui",
					"style"
				])) : a("", !0),
				e.loading ? (b(), o("div", Wn, [s("div", { class: h(E(Z)("ui-loading-bar absolute top-0 h-full w-2/5 rounded-full bg-current opacity-70", e.ui.loadingBar)) }, null, 2)])) : a("", !0)
			], 14, Un)]),
			_: 3
		}, 16));
	}
}), [["__scopeId", "data-v-5fd0a2d4"]]), Kn = /* @__PURE__ */ u({
	__name: "Badge",
	props: {
		label: {},
		variant: { default: "soft" },
		color: { default: "primary" },
		size: { default: "sm" },
		icon: {},
		dot: {
			type: Boolean,
			default: !1
		},
		pulse: {
			type: Boolean,
			default: !1
		},
		ui: { default: () => ({}) }
	},
	setup(e) {
		let t = e, n = {
			primary: {
				solid: "bg-ui-primary text-white border-transparent",
				outline: "border-ui-primary/50 text-ui-primary bg-transparent",
				soft: "bg-ui-primary/15 text-ui-primary border-ui-primary/20",
				gradient: "bg-linear-to-r from-ui-primary to-ui-primary-hover text-white border-transparent shadow-lg shadow-ui-primary/25"
			},
			success: {
				solid: "bg-ui-success text-white border-transparent",
				outline: "border-ui-success/50 text-[rgb(var(--ui-success))] bg-transparent",
				soft: "bg-[rgb(var(--ui-success)/0.15)] text-[rgb(var(--ui-success))] border-[rgb(var(--ui-success)/0.2)]",
				gradient: "bg-linear-to-r from-[rgb(var(--ui-success))] to-[rgb(var(--ui-success)/0.7)] text-white border-transparent shadow-lg shadow-[rgb(var(--ui-success)/0.25)]"
			},
			warning: {
				solid: "bg-ui-warning text-black border-transparent",
				outline: "border-[rgb(var(--ui-warning)/0.5)] text-[rgb(var(--ui-warning))] bg-transparent",
				soft: "bg-[rgb(var(--ui-warning)/0.15)] text-[rgb(var(--ui-warning))] border-[rgb(var(--ui-warning)/0.2)]",
				gradient: "bg-linear-to-r from-[rgb(var(--ui-warning))] to-[rgb(var(--ui-warning)/0.7)] text-black border-transparent shadow-lg shadow-[rgb(var(--ui-warning)/0.25)]"
			},
			error: {
				solid: "bg-ui-destructive text-white border-transparent",
				outline: "border-ui-destructive/50 text-[rgb(var(--ui-destructive))] bg-transparent",
				soft: "bg-[rgb(var(--ui-destructive)/0.15)] text-[rgb(var(--ui-destructive))] border-[rgb(var(--ui-destructive)/0.2)]",
				gradient: "bg-linear-to-r from-[rgb(var(--ui-destructive))] to-[rgb(var(--ui-destructive)/0.7)] text-white border-transparent shadow-lg shadow-[rgb(var(--ui-destructive)/0.25)]"
			},
			info: {
				solid: "bg-[rgb(var(--ui-info))] text-white border-transparent",
				outline: "border-[rgb(var(--ui-info)/0.5)] text-[rgb(var(--ui-info))] bg-transparent",
				soft: "bg-[rgb(var(--ui-info)/0.15)] text-[rgb(var(--ui-info))] border-[rgb(var(--ui-info)/0.2)]",
				gradient: "bg-linear-to-r from-[rgb(var(--ui-info))] to-[rgb(var(--ui-info)/0.7)] text-white border-transparent shadow-lg shadow-[rgb(var(--ui-info)/0.25)]"
			},
			neutral: {
				solid: "bg-ui-secondary text-ui-secondary-foreground border-transparent",
				outline: "border-ui-border text-ui-muted-foreground bg-transparent",
				soft: "bg-ui-muted/50 text-ui-muted-foreground border-ui-border/50",
				gradient: "bg-linear-to-r from-ui-secondary to-ui-muted text-ui-foreground border-transparent shadow-lg shadow-ui-muted/25"
			}
		}, l = {
			xs: "text-[10px] px-1.5 py-0.5 gap-1",
			sm: "text-xs px-2 py-0.5 gap-1",
			md: "text-xs px-2.5 py-1 gap-1.5"
		}, u = {
			xs: "h-2.5 w-2.5",
			sm: "h-3 w-3",
			md: "h-3.5 w-3.5"
		}, d = {
			xs: "h-1.5 w-1.5",
			sm: "h-2 w-2",
			md: "h-2 w-2"
		}, f = r(() => t.color in n), p = r(() => {
			let e = {
				primary: "var(--ui-primary)",
				success: "rgb(var(--ui-success))",
				warning: "rgb(var(--ui-warning))",
				error: "rgb(var(--ui-destructive))",
				info: "rgb(var(--ui-info))",
				neutral: "var(--ui-muted)"
			}[t.color] || t.color, n = t.ui?.rootStyle;
			return {
				"--badge-color": e,
				...typeof n == "object" ? n : {}
			};
		}), m = r(() => ({
			solid: "bg-[var(--badge-color)] text-white border-transparent",
			outline: "border-[var(--badge-color)]/50 text-[var(--badge-color)] bg-transparent",
			soft: "bg-[var(--badge-color)]/15 text-[var(--badge-color)] border-[var(--badge-color)]/20",
			gradient: "bg-linear-to-r from-[var(--badge-color)] to-[var(--badge-color)]/70 text-white border-transparent shadow-lg shadow-[var(--badge-color)]/25"
		})), g = r(() => Z("inline-flex items-center rounded-full border font-semibold tracking-wide uppercase", l[t.size], f.value ? n[t.color]?.[t.variant] ?? n.primary.soft : m.value[t.variant], t.ui.root)), v = r(() => f.value ? t.ui?.rootStyle || void 0 : p.value), y = r(() => {
			if (f.value) return t.ui?.dotStyle || { backgroundColor: "currentColor" };
			let e = { backgroundColor: "var(--badge-color)" };
			if (t.ui?.dotStyle) {
				let n = t.ui.dotStyle;
				if (typeof n == "object") return {
					...e,
					...n
				};
			}
			return e;
		}), x = r(() => u[t.size]), S = r(() => d[t.size]);
		return (t, n) => (b(), o("span", {
			class: h(g.value),
			style: _(E($)(v.value)),
			role: "status"
		}, [
			e.dot ? (b(), o("span", {
				key: 0,
				class: h(E(Z)("relative flex shrink-0", e.ui.dot)),
				style: _(E($)(typeof e.ui.dotStyle == "string" ? e.ui.dotStyle : void 0))
			}, [e.pulse ? (b(), o("span", {
				key: 0,
				class: "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
				style: _(E($)(y.value))
			}, null, 4)) : a("", !0), s("span", {
				class: h(["relative inline-flex rounded-full", S.value]),
				style: _(E($)(y.value))
			}, null, 6)], 6)) : a("", !0),
			e.icon ? (b(), i(Bn, {
				key: 1,
				icon: e.icon,
				ui: { root: E(Z)(x.value, e.ui.icon) },
				style: _(E($)(e.ui.iconStyle)),
				"aria-hidden": "true"
			}, null, 8, [
				"icon",
				"ui",
				"style"
			])) : a("", !0),
			s("span", {
				class: h(E(Z)("truncate", e.ui.label)),
				style: _(E($)(e.ui.labelStyle))
			}, [C(t.$slots, "default", {}, () => [c(T(e.label), 1)])], 6)
		], 6));
	}
}), qn = ["role", "aria-label"], Jn = { class: "feedback-banner__content" }, Yn = { key: 0 }, Xn = { key: 1 }, Zn = ["aria-label"], Qn = /*#__PURE__*/ Hn(/* @__PURE__ */ u({
	__name: "FeedbackBanner",
	props: {
		tone: { default: "info" },
		title: { default: void 0 },
		message: { default: void 0 },
		dismissible: {
			type: Boolean,
			default: !0
		},
		ariaLabel: { default: void 0 },
		dismissLabel: { default: void 0 }
	},
	emits: ["dismiss"],
	setup(e, { emit: t }) {
		let n = e, c = t, u = {
			success: zt,
			error: Vt,
			warning: kn,
			info: sn
		}, d = r(() => n.tone === "error" ? "alert" : "status"), f = r(() => n.ariaLabel ?? `${n.tone} feedback`), p = r(() => n.dismissLabel ?? `Dismiss ${n.tone} feedback`);
		return (t, n) => (b(), o("section", {
			class: h(["feedback-banner", `feedback-banner--${e.tone}`]),
			role: d.value,
			"aria-label": f.value
		}, [
			(b(), i(w(u[e.tone]), {
				class: "feedback-banner__icon",
				"aria-hidden": "true"
			})),
			s("div", Jn, [
				e.title ? (b(), o("strong", Yn, T(e.title), 1)) : a("", !0),
				e.message ? (b(), o("p", Xn, T(e.message), 1)) : a("", !0),
				C(t.$slots, "default", {}, void 0, !0)
			]),
			e.dismissible ? (b(), o("button", {
				key: 0,
				type: "button",
				class: "feedback-banner__dismiss",
				"aria-label": p.value,
				onClick: n[0] ||= (e) => c("dismiss")
			}, [l(E(Fn), { "aria-hidden": "true" })], 8, Zn)) : a("", !0)
		], 10, qn));
	}
}), [["__scopeId", "data-v-7b5f31ea"]]), $n = /* @__PURE__ */ function(e) {
	return e.Header = "header", e.Edge = "edge", e.None = "none", e;
}({}), er = /* @__PURE__ */ function(e) {
	return e.Partial = "partial", e.Full = "full", e;
}({});
$n.None, $n.None, er.Partial;
var tr = /* @__PURE__ */ u({
	__name: "SectionPanel",
	props: {
		title: {},
		icon: {},
		noPadding: {
			type: Boolean,
			default: !1
		},
		compact: {
			type: Boolean,
			default: !1
		},
		ui: { default: () => ({}) }
	},
	setup(e) {
		let t = e, n = r(() => {
			let { ui: e } = t;
			return {
				root: Z("bg-ui-card border border-ui-border rounded-xl", "shadow-xs", e.root),
				header: Z("flex items-center border-b border-ui-border/50", t.compact ? "gap-2 px-4 py-2.5" : "gap-3 px-6 py-4", e.header),
				icon: Z("text-ui-primary", e.icon),
				title: Z("font-semibold text-ui-foreground", e.title),
				content: Z(t.noPadding ? "" : t.compact ? "p-4" : "p-6", e.content),
				footer: Z(t.compact ? "px-4 py-2.5" : "px-6 py-4", "border-t border-ui-border/50 bg-ui-muted/20", e.footer)
			};
		});
		return (t, r) => (b(), o("div", {
			class: h(n.value.root),
			style: _(e.ui?.rootStyle)
		}, [
			e.title || t.$slots.header || e.icon ? (b(), o("div", {
				key: 0,
				class: h(n.value.header),
				style: _(e.ui?.headerStyle)
			}, [C(t.$slots, "header", {}, () => [e.icon ? (b(), i(Bn, {
				key: 0,
				icon: e.icon,
				ui: {
					root: E(Z)(n.value.icon, "w-5 h-5"),
					rootStyle: e.ui?.iconStyle
				}
			}, null, 8, ["icon", "ui"])) : a("", !0), e.title ? (b(), o("h2", {
				key: 1,
				class: h(n.value.title),
				style: _(e.ui?.titleStyle)
			}, T(e.title), 7)) : a("", !0)]), C(t.$slots, "header-actions")], 6)) : a("", !0),
			s("div", {
				class: h(n.value.content),
				style: _(e.ui?.contentStyle)
			}, [C(t.$slots, "default")], 6),
			t.$slots.footer ? (b(), o("div", {
				key: 1,
				class: h(n.value.footer),
				style: _(e.ui?.footerStyle)
			}, [C(t.$slots, "footer")], 6)) : a("", !0)
		], 6));
	}
});
function nr(e) {
	return [...new Set(e)];
}
function rr(e, t) {
	return e.mode === "all" ? !e.excludedItems.includes(t) : e.selectedItems.includes(t);
}
function ir(e, t) {
	if (e.mode === "all") {
		let n = new Set(t);
		return {
			mode: "all",
			excludedItems: e.excludedItems.filter((e) => !n.has(e))
		};
	}
	return {
		mode: "explicit",
		selectedItems: nr([...e.selectedItems, ...t])
	};
}
function ar(e, t) {
	if (e.mode === "all") return {
		mode: "all",
		excludedItems: nr([...e.excludedItems, ...t])
	};
	let n = new Set(t);
	return {
		mode: "explicit",
		selectedItems: e.selectedItems.filter((e) => !n.has(e))
	};
}
var or = ["checked", "aria-label"], sr = [
	"role",
	"tabindex",
	"aria-sort",
	"onClick",
	"onKeydown"
], cr = { class: "flex items-center gap-1" }, lr = {
	key: 0,
	class: "inline-flex items-center"
}, ur = {
	key: 0,
	class: "ml-0.5 text-[10px] leading-none font-bold text-ui-primary"
}, dr = {
	key: 1,
	class: "py-8"
}, fr = ["onClick"], pr = [
	"checked",
	"aria-label",
	"onChange"
], mr = [
	"aria-label",
	"aria-expanded",
	"onClick"
], hr = "rounded-sm border border-ui-border bg-ui-input text-ui-primary shadow-xs transition-colors checked:border-ui-primary checked:bg-ui-primary focus:ring-ui-ring", gr = /* @__PURE__ */ u({
	__name: "DataTable",
	props: {
		columns: { default: () => [] },
		items: {},
		itemKey: {},
		loading: {
			type: Boolean,
			default: !1
		},
		sort: {},
		sorts: {},
		sortable: { type: Boolean },
		responsive: {
			type: Boolean,
			default: !0
		},
		ui: { default: () => ({}) },
		selectable: {
			type: Boolean,
			default: !1
		},
		selectedItems: { default: () => [] },
		selectionState: {},
		rowClass: {},
		enableRowClick: {
			type: Boolean,
			default: !1
		},
		expandable: {
			type: Boolean,
			default: !1
		},
		expandedRows: { default: () => [] },
		stickyHeader: {
			type: Boolean,
			default: !1
		},
		density: { default: "normal" },
		striped: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"sort-change",
		"sorts-change",
		"update:selectedItems",
		"update:selectionState",
		"update:expandedRows",
		"row-click",
		"select-all"
	],
	setup(t, { emit: n }) {
		let u = t, d = n, f = x(null), p = /* @__PURE__ */ new WeakMap(), m = 0, g = /* @__PURE__ */ new WeakMap(), v = 0;
		function y(e) {
			let t = e[u.itemKey ?? "id"];
			if (t != null) return t;
			let n = p.get(e);
			return n || (m += 1, n = `__data-table-row-${m}`, p.set(e, n)), n;
		}
		function ee(e) {
			let t = g.get(e);
			return t || (v += 1, t = `object:${v}`, g.set(e, t)), t;
		}
		function te(e) {
			let t = y(e);
			switch (typeof t) {
				case "string": return `string:${t}`;
				case "number": return `number:${t}`;
				case "symbol": return t;
				case "boolean": return `boolean:${t}`;
				case "bigint": return `bigint:${t.toString()}`;
				case "object":
					if (t !== null) return ee(t);
					break;
				case "function": return ee(t);
			}
			return `${typeof t}:${String(t)}`;
		}
		let D = r(() => u.items.map(y)), k = r(() => u.selectionState ?? {
			mode: "explicit",
			selectedItems: u.selectedItems
		}), M = r(() => u.items.length !== 0 && D.value.every((e) => rr(k.value, e))), N = r(() => u.items.length !== 0 && D.value.some((e) => rr(k.value, e)));
		O(() => {
			f.value && (f.value.indeterminate = N.value && !M.value);
		});
		function P(e) {
			return rr(k.value, y(e));
		}
		function F(e) {
			if (u.selectionState !== void 0) {
				d("update:selectionState", e);
				return;
			}
			e.mode === "explicit" && d("update:selectedItems", e.selectedItems);
		}
		function I() {
			F(M.value ? ar(k.value, D.value) : ir(k.value, D.value)), d("select-all", !M.value);
		}
		function L(e) {
			let t = y(e);
			F(P(e) ? ar(k.value, [t]) : ir(k.value, [t]));
		}
		function R(e) {
			return u.expandedRows.includes(y(e));
		}
		function z(e) {
			let t = y(e);
			u.expandedRows.includes(t) ? d("update:expandedRows", u.expandedRows.filter((e) => e !== t)) : d("update:expandedRows", [...u.expandedRows, t]);
		}
		let B = /* @__PURE__ */ new Set([
			"BUTTON",
			"INPUT",
			"A",
			"LABEL"
		]);
		function V(e, t, n) {
			if (!u.enableRowClick) return;
			let r = n.target;
			if (!r) return;
			let i = r;
			for (; i && i !== n.currentTarget;) {
				if (B.has(i.tagName) || i.hasAttribute("data-no-row-click")) return;
				i = i.parentElement;
			}
			d("row-click", e, t, n);
		}
		function H(e) {
			return e.sortable ?? u.sortable ?? !1;
		}
		let U = r(() => u.sorts !== void 0);
		function ne(e) {
			U.value ? ie(e) : re(e);
		}
		function re(e) {
			let t = u.sort;
			t && t.key === e ? d("sort-change", {
				key: e,
				direction: t.direction === "asc" ? "desc" : "asc"
			}) : d("sort-change", {
				key: e,
				direction: "asc"
			});
		}
		function ie(e) {
			let t = u.sorts ? [...u.sorts] : [], n = t.findIndex((t) => t.key === e);
			n === -1 ? t.push({
				key: e,
				direction: "asc"
			}) : t[n].direction === "asc" ? t[n] = {
				key: e,
				direction: "desc"
			} : t.splice(n, 1), d("sorts-change", t);
		}
		function ae(e) {
			if (!u.sorts) return 0;
			let t = u.sorts.findIndex((t) => t.key === e);
			return t === -1 ? 0 : t + 1;
		}
		function oe(e) {
			if (!u.sorts) return Dt;
			let t = u.sorts.find((t) => t.key === e);
			return t ? t.direction === "asc" ? Ot : Tt : Dt;
		}
		function se(e) {
			if (U.value) return oe(e);
			let t = u.sort;
			return t && t.key === e ? t.direction === "asc" ? Ot : Tt : Dt;
		}
		function ce(e) {
			return U.value ? ae(e) > 0 ? "text-ui-primary" : "text-ui-muted-foreground/50" : u.sort?.key === e ? "text-ui-primary" : "text-ui-muted-foreground/50";
		}
		let le = r(() => {
			switch (u.density) {
				case "compact": return {
					headerPadding: "px-4 py-1",
					rowNonResponsive: "flex items-center px-4 py-1",
					rowResponsive: "block p-2 space-y-2 md:space-y-0 md:flex md:items-center md:px-4 md:py-1"
				};
				case "comfortable": return {
					headerPadding: "px-6 py-5",
					rowNonResponsive: "flex items-center px-6 py-6",
					rowResponsive: "block p-6 space-y-2 md:space-y-0 md:flex md:items-center md:px-6 md:py-6"
				};
				default: return {
					headerPadding: "px-6 py-3",
					rowNonResponsive: "flex items-center px-6 py-4",
					rowResponsive: "block p-4 space-y-2 md:space-y-0 md:flex md:items-center md:px-6 md:py-4"
				};
			}
		}), W = r(() => {
			let { ui: e, responsive: t, stickyHeader: n, enableRowClick: r } = u, i = le.value;
			return {
				root: Z("bg-ui-card border border-ui-border rounded-xl overflow-x-auto", e.root),
				header: Z("bg-ui-muted/30 border-b border-ui-border", n && "sticky top-0 z-10", e.header),
				headerRow: Z(t ? "hidden md:flex" : "flex", "items-center", i.headerPadding, "text-xs font-bold text-ui-muted-foreground uppercase tracking-wider", e.headerRow),
				headerCell: Z("text-xs font-bold text-ui-muted-foreground uppercase tracking-wider", e?.headerCell),
				body: Z("divide-y divide-ui-border", e.body),
				row: Z(t ? i.rowResponsive : i.rowNonResponsive, "hover:bg-ui-muted/20 transition-colors", r && "cursor-pointer", e.row),
				cell: Z("text-sm text-ui-foreground", e.cell),
				cardLabel: Z("block mb-0.5 text-xs font-semibold text-ui-muted-foreground uppercase tracking-wider md:hidden", e.cardLabel),
				empty: Z("py-16 text-center", e.empty),
				footer: Z("border-t border-ui-border px-6 py-4 bg-ui-muted/20", e?.footer),
				selectionCell: Z("w-10 flex-none flex items-center", e?.selectionCell),
				expansionCell: Z("w-10 flex-none flex items-center justify-center", e?.expansionCell),
				expansionRow: Z("px-6 py-4 bg-ui-muted/10 border-t border-ui-border/50", e?.expansionRow)
			};
		});
		function ue(e) {
			return u.striped && e % 2 == 0 ? "bg-ui-muted/10" : "";
		}
		function de(e, t) {
			return u.rowClass?.(e, t) ?? "";
		}
		return (n, r) => (b(), o("div", {
			class: h(W.value.root),
			style: _(t.ui?.rootStyle)
		}, [
			n.$slots.header || t.columns.length > 0 || t.selectable ? (b(), o("div", {
				key: 0,
				class: h(W.value.header),
				style: _(t.ui?.headerStyle)
			}, [C(n.$slots, "header", {}, () => [s("div", {
				class: h(W.value.headerRow),
				style: _(t.ui?.headerRowStyle)
			}, [
				t.selectable ? (b(), o("div", {
					key: 0,
					class: h(W.value.selectionCell),
					style: _(t.ui?.selectionCellStyle)
				}, [s("input", {
					ref_key: "headerCheckboxEl",
					ref: f,
					type: "checkbox",
					class: h(hr),
					checked: M.value,
					"aria-label": M.value ? "Deselect page rows" : "Select page rows",
					onChange: I
				}, null, 40, or)], 6)) : a("", !0),
				(b(!0), o(e, null, S(t.columns, (e) => (b(), o("div", {
					key: e.key,
					class: h([e.headerClass || "flex-1", H(e) && "cursor-pointer select-none hover:text-ui-foreground"]),
					role: H(e) ? "button" : void 0,
					tabindex: H(e) ? 0 : void 0,
					"aria-sort": H(e) ? t.sort?.key === e.key ? t.sort.direction === "asc" ? "ascending" : "descending" : "none" : void 0,
					onClick: (t) => H(e) && ne(e.key),
					onKeydown: [A((t) => H(e) && ne(e.key), ["enter"]), A(j((t) => H(e) && ne(e.key), ["prevent"]), ["space"])]
				}, [s("div", cr, [c(T(e.label) + " ", 1), H(e) ? (b(), o("span", lr, [(b(), i(w(se(e.key)), { class: h(E(Z)("h-3.5 w-3.5 transition-colors", ce(e.key), t.ui?.sortIcon)) }, null, 8, ["class"])), U.value && t.sorts && t.sorts.length > 1 && ae(e.key) > 0 ? (b(), o("span", ur, T(ae(e.key)), 1)) : a("", !0)])) : a("", !0)])], 42, sr))), 128)),
				t.expandable ? (b(), o("div", {
					key: 1,
					class: h(W.value.expansionCell),
					style: _(t.ui?.expansionCellStyle)
				}, null, 6)) : a("", !0)
			], 6)])], 6)) : a("", !0),
			t.loading ? (b(), o("div", dr, [C(n.$slots, "loading", {}, () => [r[0] ||= s("div", { class: "flex items-center justify-center gap-3" }, [s("div", { class: "h-5 w-5 animate-spin rounded-full border-2 border-ui-primary/30 border-t-ui-primary" }), s("span", { class: "text-sm text-ui-muted-foreground" }, "Loading...")], -1)])])) : (b(), o("div", {
				key: 2,
				class: h(W.value.body),
				style: _(t.ui?.bodyStyle)
			}, [t.items.length > 0 ? (b(!0), o(e, { key: 0 }, S(t.items, (r, i) => (b(), o(e, { key: te(r) }, [s("div", {
				class: h([
					W.value.row,
					ue(i),
					de(r, i)
				]),
				style: _(t.ui?.rowStyle),
				onClick: (e) => V(r, i, e)
			}, [C(n.$slots, "row", {
				item: r,
				index: i
			}, () => [
				t.selectable ? (b(), o("div", {
					key: 0,
					class: h(W.value.selectionCell),
					style: _(t.ui?.selectionCellStyle),
					"data-no-row-click": ""
				}, [s("input", {
					type: "checkbox",
					class: h(hr),
					checked: P(r),
					"aria-label": `Select row ${i + 1}`,
					onChange: (e) => L(r)
				}, null, 40, pr)], 6)) : a("", !0),
				(b(!0), o(e, null, S(t.columns, (e) => (b(), o("div", {
					key: e.key,
					class: h(E(Z)(e.class || "flex-1", W.value.cell)),
					style: _(t.ui?.cellStyle)
				}, [t.responsive ? (b(), o("span", {
					key: 0,
					class: h(W.value.cardLabel),
					style: _(t.ui?.cardLabelStyle)
				}, T(e.label), 7)) : a("", !0), C(n.$slots, `cell-${e.key}`, {
					item: r,
					value: r[e.key]
				}, () => [c(T(r[e.key]), 1)])], 6))), 128)),
				t.expandable ? (b(), o("div", {
					key: 1,
					class: h(W.value.expansionCell),
					style: _(t.ui?.expansionCellStyle),
					"data-no-row-click": ""
				}, [s("button", {
					type: "button",
					class: "rounded-sm p-1 transition-colors hover:bg-ui-muted/40",
					"aria-label": R(r) ? "Collapse row" : "Expand row",
					"aria-expanded": R(r),
					onClick: (e) => z(r)
				}, [l(E(Pt), { class: h(["h-4 w-4 text-ui-muted-foreground transition-transform duration-200", { "rotate-180": R(r) }]) }, null, 8, ["class"])], 8, mr)], 6)) : a("", !0)
			])], 14, fr), t.expandable && R(r) ? (b(), o("div", {
				key: 0,
				class: h(W.value.expansionRow),
				style: _(t.ui?.expansionRowStyle)
			}, [C(n.$slots, "expansion", {
				item: r,
				index: i
			})], 6)) : a("", !0)], 64))), 128)) : (b(), o("div", {
				key: 1,
				class: h(W.value.empty),
				style: _(t.ui?.emptyStyle)
			}, [C(n.$slots, "empty", {}, () => [r[1] ||= s("p", { class: "text-ui-muted-foreground" }, "No data available", -1)])], 6))], 6)),
			n.$slots.footer ? (b(), o("div", {
				key: 3,
				class: h(W.value.footer),
				style: _(t.ui?.footerStyle)
			}, [C(n.$slots, "footer")], 6)) : a("", !0)
		], 6));
	}
});
function _r(e) {
	return function(e) {
		if (Array.isArray(e)) return vr(e);
	}(e) || function(e) {
		if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
	}(e) || function(e, t) {
		if (e) {
			if (typeof e == "string") return vr(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
			if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return vr(e, t);
		}
	}(e) || function() {
		throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function vr(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var yr = function(e) {
	(function() {
		var t = {}.hasOwnProperty;
		function n() {
			for (var e = [], r = 0; r < arguments.length; r++) {
				var i = arguments[r];
				if (i) {
					var a = typeof i;
					if (a === "string" || a === "number") e.push(i);
					else if (Array.isArray(i)) {
						if (i.length) {
							var o = n.apply(null, i);
							o && e.push(o);
						}
					} else if (a === "object") {
						if (i.toString === Object.prototype.toString) for (var s in i) t.call(i, s) && i[s] && e.push(s);
						else e.push(i.toString());
					}
				}
			}
			return e.join(" ");
		}
		e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
	})();
}, br, xr;
yr(xr = {
	path: br,
	exports: {},
	require: function(e, t) {
		return function() {
			throw Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
		}(t == null && xr.path);
	}
}, xr.exports), xr.exports;
function Sr(e, t, n) {
	var r, i, a, o, s;
	function c() {
		var l = Date.now() - o;
		l < t && l >= 0 ? r = setTimeout(c, t - l) : (r = null, n || (s = e.apply(a, i), a = i = null));
	}
	t ??= 100;
	var l = function() {
		a = this, i = arguments, o = Date.now();
		var l = n && !r;
		return r ||= setTimeout(c, t), l && (s = e.apply(a, i), a = i = null), s;
	};
	return l.clear = function() {
		r &&= (clearTimeout(r), null);
	}, l.flush = function() {
		r &&= (s = e.apply(a, i), a = i = null, clearTimeout(r), null);
	}, l;
}
Sr.debounce = Sr;
var Cr = function() {
	function e(e, t, n, r, i) {
		this.type = "drag", this.nativeEvent = e, this.position = n, this.previousPosition = r, this.element = t, this.anchor = i;
	}
	return e.prototype.shift = function() {
		var e = this, t = e.element, n = e.anchor, r = e.position;
		if (t) {
			var i = t.getBoundingClientRect(), a = i.left, o = i.top;
			return {
				left: r.left - a - n.left,
				top: r.top - o - n.top
			};
		}
		return {
			left: 0,
			top: 0
		};
	}, e;
}();
//#endregion
//#region src/formatting.ts
function wr(e) {
	return e === null || e < 0 ? "—" : e < 60 ? `${Math.floor(e)}s` : e < 3600 ? `${Math.floor(e / 60)}m ${Math.floor(e % 60)}s` : `${Math.floor(e / 3600)}h ${Math.floor(e % 3600 / 60)}m`;
}
function Tr(e, t, n = !1, r = "en") {
	if (!e) return "—";
	let i = new Date(e);
	if (Number.isNaN(i.getTime())) return e;
	try {
		return new Intl.DateTimeFormat(r === "it" ? "it-IT" : "en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			...n ? { second: "2-digit" } : {},
			hour12: !1,
			timeZone: t ?? void 0
		}).format(i);
	} catch {
		return e;
	}
}
//#endregion
//#region src/presentation.ts
var Er = {
	en: {
		actions: {
			probeQueue: "Test queue",
			probeReverb: "Test Reverb",
			recover: "Recover runtime",
			refresh: "Refresh status",
			restart: "Restart",
			start: "Start",
			stop: "Stop"
		},
		applicationTimezone: "application timezone",
		configuredLimit: "Configured limit",
		cronExpression: "Cron expression",
		desiredCapacity: "Desired capacity",
		desiredState: "Desired state",
		disabledMessage: "Process supervision is disabled for this installation.",
		emptyGroups: "No managed process groups are configured for this installation.",
		emptyInstances: "No process instance is currently active.",
		groupKinds: {
			queue_once: "queue · one-shot",
			scheduler: "scheduler · cron",
			reverb: "reverb",
			artisan_service: "service · singleton"
		},
		instanceStates: {
			stopped: "stopped",
			starting: "starting",
			running: "running",
			idle: "idle",
			stopping: "stopping",
			backoff: "backoff",
			fatal: "fatal",
			uncertain: "uncertain"
		},
		lastHeartbeat: (e) => `Last heartbeat: ${e}.`,
		noHeartbeat: "Runtime state is available, but no heartbeat has been published yet.",
		off: "Off",
		on: "On",
		processCount: (e) => `${e} process${e === 1 ? "" : "es"}`,
		processCountMax: (e) => `${e} process${e === 1 ? "" : "es"} max`,
		processGroups: "Process groups",
		reason: (e) => `Runtime reason: ${e}.`,
		running: "Running",
		schedulerState: "Scheduler state",
		schedulerNotice: (e) => `Cron is evaluated in ${e}. Missed minutes are not backfilled and schedule:run never overlaps itself.`,
		slot: "Slot",
		state: "State",
		pid: "PID",
		uptime: "Uptime",
		restarts: "Restarts",
		lastExit: "Last exit",
		lastError: "Last error",
		nextRun: "Next",
		stopped: "Stopped",
		summaries: {
			disabled: "disabled",
			stopped: "stopped",
			starting: "starting",
			ready: "ready",
			degraded: "degraded",
			stopping: "stopping",
			recovery_required: "recovery required",
			unsupported: "unsupported"
		},
		supervisorStatusAriaLabel: "Process Supervisor status",
		supervisorTitle: "Laravel process supervisor"
	},
	it: {
		actions: {
			probeQueue: "Testa coda",
			probeReverb: "Testa Reverb",
			recover: "Ripristina runtime",
			refresh: "Aggiorna stato",
			restart: "Riavvia",
			start: "Avvia",
			stop: "Arresta"
		},
		applicationTimezone: "fuso orario applicazione",
		configuredLimit: "Limite configurato",
		cronExpression: "Espressione cron",
		desiredCapacity: "Capacità desiderata",
		desiredState: "Stato desiderato",
		disabledMessage: "La supervisione dei processi è disabilitata per questa installazione.",
		emptyGroups: "Nessun gruppo di processi gestito è configurato per questa installazione.",
		emptyInstances: "Nessuna istanza di processo è attualmente attiva.",
		groupKinds: {
			queue_once: "coda · esecuzione singola",
			scheduler: "scheduler · cron",
			reverb: "reverb",
			artisan_service: "servizio · istanza singola"
		},
		instanceStates: {
			stopped: "arrestato",
			starting: "in avvio",
			running: "in esecuzione",
			idle: "in attesa",
			stopping: "in arresto",
			backoff: "in attesa di nuovo tentativo",
			fatal: "errore fatale",
			uncertain: "incerto"
		},
		lastHeartbeat: (e) => `Ultimo heartbeat: ${e}.`,
		noHeartbeat: "Lo stato del runtime è disponibile, ma non è ancora stato pubblicato alcun heartbeat.",
		off: "Disattivo",
		on: "Attivo",
		processCount: (e) => `${e} process${e === 1 ? "o" : "i"}`,
		processCountMax: (e) => `${e} process${e === 1 ? "o" : "i"} massimo`,
		processGroups: "Gruppi di processi",
		reason: (e) => `Motivo del runtime: ${e}.`,
		running: "In esecuzione",
		schedulerState: "Stato scheduler",
		schedulerNotice: (e) => `Pianificazione nel fuso ${e}. Le esecuzioni non si sovrappongono e i minuti persi non vengono recuperati.`,
		slot: "Slot",
		state: "Stato",
		pid: "PID",
		uptime: "Attività",
		restarts: "Riavvii",
		lastExit: "Ultima uscita",
		lastError: "Ultimo errore",
		nextRun: "Prossima esecuzione",
		stopped: "Arrestato",
		summaries: {
			disabled: "disabilitato",
			stopped: "arrestato",
			starting: "in avvio",
			ready: "pronto",
			degraded: "degradato",
			stopping: "in arresto",
			recovery_required: "ripristino necessario",
			unsupported: "non supportato"
		},
		supervisorStatusAriaLabel: "Stato del supervisore processi",
		supervisorTitle: "Supervisore processi Laravel"
	}
};
function Dr(e = "en") {
	return Er[e];
}
function Or(e, t = "en") {
	return Dr(t).summaries[e];
}
function kr(e) {
	return e === "ready" ? "success" : e === "recovery_required" || e === "unsupported" ? "error" : e === "degraded" || e === "stopping" ? "warning" : "info";
}
function Ar(e) {
	return e === "running" || e === "idle" ? "success" : e === "fatal" || e === "uncertain" ? "error" : e === "backoff" || e === "stopping" ? "warning" : e === "starting" ? "info" : "neutral";
}
//#endregion
//#region src/components/ProcessInstanceTable.vue?vue&type=script&setup=true&lang.ts
var jr = { class: "font-mono text-xs" }, Mr = { class: "font-mono text-xs text-ui-muted-foreground" }, Nr = { class: "font-mono text-xs text-ui-muted-foreground" }, Pr = ["title"], Fr = { class: "text-sm text-ui-muted-foreground" }, Ir = /* @__PURE__ */ u({
	__name: "ProcessInstanceTable",
	props: {
		instances: {},
		locale: {}
	},
	setup(e) {
		let t = e, n = r(() => Dr(t.locale ?? "en")), a = r(() => [
			{
				key: "slot_label",
				label: n.value.slot,
				class: "md:w-12 md:flex-none",
				headerClass: "w-12 flex-none"
			},
			{
				key: "state",
				label: n.value.state,
				class: "md:min-w-0 md:flex-1",
				headerClass: "min-w-0 flex-1 break-words"
			},
			{
				key: "pid_label",
				label: n.value.pid,
				class: "md:min-w-0 md:flex-1",
				headerClass: "min-w-0 flex-1 break-words"
			},
			{
				key: "uptime",
				label: n.value.uptime,
				class: "md:min-w-0 md:flex-1",
				headerClass: "min-w-0 flex-1 break-words"
			},
			{
				key: "restart_count",
				label: n.value.restarts,
				class: "md:min-w-0 md:flex-1",
				headerClass: "min-w-0 flex-1 break-words"
			},
			{
				key: "exit_label",
				label: n.value.lastExit,
				class: "md:min-w-0 md:flex-1",
				headerClass: "min-w-0 flex-1 break-words"
			},
			{
				key: "error_label",
				label: n.value.lastError,
				class: "md:min-w-0 md:flex-1",
				headerClass: "min-w-0 flex-1 break-words"
			}
		]), o = r(() => t.instances.map((e) => ({
			id: e.id,
			slot: e.slot,
			slot_label: `#${e.slot + 1}`,
			state: e.state,
			pid_label: e.pid ?? "—",
			uptime: wr(e.uptime_seconds),
			restart_count: e.restart_count,
			exit_label: e.last_exit_code ?? "—",
			error_label: e.last_error_code ?? "—"
		})));
		function c(e) {
			let t = String(e);
			return t === "stopped" || t === "starting" || t === "running" || t === "idle" || t === "stopping" || t === "backoff" || t === "fatal" || t === "uncertain" ? t : "uncertain";
		}
		return (e, t) => (b(), i(E(gr), {
			items: o.value,
			columns: a.value,
			"item-key": "id",
			density: "compact",
			responsive: "",
			ui: {
				headerRow: "min-h-10",
				row: "min-h-10",
				empty: "py-8"
			}
		}, {
			"cell-state": k(({ value: e }) => [l(E(Kn), {
				label: n.value.instanceStates[c(e)],
				color: E(Ar)(c(e)),
				variant: "soft",
				size: "xs",
				dot: ""
			}, null, 8, ["label", "color"])]),
			"cell-slot_label": k(({ value: e }) => [s("span", jr, T(e), 1)]),
			"cell-pid_label": k(({ value: e }) => [s("span", Mr, T(e), 1)]),
			"cell-exit_label": k(({ value: e }) => [s("span", Nr, T(e), 1)]),
			"cell-error_label": k(({ value: e }) => [s("span", {
				class: "block truncate font-mono text-xs text-ui-muted-foreground",
				title: String(e)
			}, T(e), 9, Pr)]),
			empty: k(() => [s("p", Fr, T(n.value.emptyInstances), 1)]),
			_: 1
		}, 8, ["items", "columns"]));
	}
}), Lr = { class: "ml-auto flex flex-wrap items-center justify-end gap-2" }, Rr = { class: "space-y-4" }, zr = {
	key: 1,
	class: "grid gap-4 rounded-xl border border-ui-border bg-ui-muted/15 p-4 sm:grid-cols-2 sm:items-center"
}, Br = { class: "text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase" }, Vr = { class: "mt-1 text-sm font-medium text-ui-foreground" }, Hr = { class: "text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase" }, Ur = { class: "mt-1 text-sm font-medium text-ui-foreground" }, Wr = {
	key: 2,
	class: "grid gap-4 rounded-xl border border-ui-border bg-ui-muted/15 p-4 sm:grid-cols-2 sm:items-center"
}, Gr = { class: "min-w-0" }, Kr = { class: "text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase" }, qr = { class: "mt-1 flex flex-wrap items-center gap-2" }, Jr = {
	key: 0,
	class: "text-xs text-ui-muted-foreground"
}, Yr = { class: "min-w-0" }, Xr = { class: "text-xs font-medium text-ui-muted-foreground" }, Zr = { class: "mt-1 block truncate text-sm font-medium text-ui-foreground" }, Qr = {
	key: 3,
	class: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ui-border bg-ui-muted/15 p-4"
}, $r = { class: "text-xs font-semibold tracking-wide text-ui-muted-foreground uppercase" }, ei = { class: "mt-1 text-sm font-medium text-ui-foreground" }, ti = /* @__PURE__ */ u({
	__name: "ProcessGroupCard",
	props: {
		group: {},
		processingAction: { default: null },
		controlsDisabled: {
			type: Boolean,
			default: !1
		},
		locale: { default: "en" },
		showProbeControls: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"start",
		"stop",
		"restart",
		"probe"
	],
	setup(e, { emit: t }) {
		let n = e, u = r(() => Dr(n.locale)), d = t;
		function f() {
			return u.value.groupKinds[n.group.kind];
		}
		return (t, r) => (b(), i(E(tr), {
			title: n.group.label,
			ui: {
				root: "min-w-0",
				header: "flex-wrap",
				title: "min-w-0",
				content: "min-w-0"
			}
		}, {
			"header-actions": k(() => [s("div", Lr, [
				l(E(Kn), {
					label: f(),
					color: "neutral"
				}, null, 8, ["label"]),
				n.showProbeControls && (n.group.kind === "queue_once" || n.group.kind === "reverb") ? (b(), i(E(Gn), {
					key: 0,
					size: "sm",
					variant: "secondary",
					loading: e.processingAction === "probe",
					disabled: n.controlsDisabled || e.processingAction !== null || !n.group.can_probe,
					onClick: r[0] ||= (e) => d("probe", n.group.id)
				}, {
					default: k(() => [c(T(n.group.kind === "reverb" ? u.value.actions.probeReverb : u.value.actions.probeQueue), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : a("", !0),
				n.group.can_start ? (b(), i(E(Gn), {
					key: 1,
					size: "sm",
					variant: "success",
					loading: e.processingAction === "start",
					disabled: n.controlsDisabled || e.processingAction !== null,
					onClick: r[1] ||= (e) => d("start", n.group.id)
				}, {
					default: k(() => [c(T(u.value.actions.start), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : a("", !0),
				n.group.can_restart ? (b(), i(E(Gn), {
					key: 2,
					size: "sm",
					variant: "secondary",
					loading: e.processingAction === "restart",
					disabled: n.controlsDisabled || e.processingAction !== null,
					onClick: r[2] ||= (e) => d("restart", n.group.id)
				}, {
					default: k(() => [c(T(u.value.actions.restart), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : a("", !0),
				n.group.can_stop ? (b(), i(E(Gn), {
					key: 3,
					size: "sm",
					variant: "danger",
					loading: e.processingAction === "stop",
					disabled: n.controlsDisabled || e.processingAction !== null,
					onClick: r[3] ||= (e) => d("stop", n.group.id)
				}, {
					default: k(() => [c(T(u.value.actions.stop), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])) : a("", !0)
			])]),
			default: k(() => [s("div", Rr, [
				n.group.kind === "scheduler" || n.group.capability_message ? (b(), i(E(Qn), {
					key: 0,
					tone: "info",
					message: n.group.capability_message ?? u.value.schedulerNotice(n.group.timezone ?? "UTC"),
					dismissible: !1
				}, null, 8, ["message"])) : a("", !0),
				n.group.kind === "queue_once" ? (b(), o("div", zr, [s("div", null, [s("p", Br, T(u.value.desiredCapacity), 1), s("p", Vr, T(u.value.processCount(n.group.desired_processes)), 1)]), s("div", null, [s("p", Hr, T(u.value.configuredLimit), 1), s("p", Ur, T(u.value.processCountMax(n.group.max_processes)), 1)])])) : n.group.kind === "scheduler" ? (b(), o("div", Wr, [s("div", Gr, [s("p", Kr, T(u.value.schedulerState), 1), s("div", qr, [l(E(Kn), {
					label: n.group.desired_processes > 0 ? u.value.on : u.value.off,
					color: n.group.desired_processes > 0 ? "success" : "neutral",
					variant: "soft",
					size: "xs"
				}, null, 8, ["label", "color"]), n.group.next_run_at ? (b(), o("span", Jr, T(u.value.nextRun) + ": " + T(E(Tr)(n.group.next_run_at, n.group.timezone, !1, n.locale)), 1)) : a("", !0)])]), s("div", Yr, [s("p", Xr, T(u.value.cronExpression) + " · " + T(n.group.timezone ?? u.value.applicationTimezone), 1), s("code", Zr, T(n.group.cron ?? "* * * * *"), 1)])])) : (b(), o("div", Qr, [s("div", null, [s("p", $r, T(u.value.desiredState), 1), s("p", ei, T(n.group.desired_processes > 0 ? u.value.running : u.value.stopped), 1)])])),
				l(Ir, {
					instances: n.group.instances,
					locale: n.locale
				}, null, 8, ["instances", "locale"])
			])]),
			_: 1
		}, 8, ["title"]));
	}
}), ni = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, ri = (e) => e === "", ii = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), ai = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), oi = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), si = (e) => {
	let t = oi(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, ci = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
}, li = ({ name: e, iconNode: t, absoluteStrokeWidth: n, "absolute-stroke-width": r, strokeWidth: i, "stroke-width": a, size: o = ci.width, color: s = ci.stroke, ...c }, { slots: l }) => f("svg", {
	...ci,
	...c,
	width: o,
	height: o,
	stroke: s,
	"stroke-width": ri(n) || ri(r) || n === !0 || r === !0 ? Number(i || a || ci["stroke-width"]) * 24 / Number(o) : i || a || ci["stroke-width"],
	class: ii("lucide", c.class, ...e ? [`lucide-${ai(si(e))}-icon`, `lucide-${ai(e)}`] : ["lucide-icon"]),
	...!l.default && !ni(c) && { "aria-hidden": "true" }
}, [...t.map((e) => f(...e)), ...l.default ? [l.default()] : []]), ui = (e, t) => (n, { slots: r, attrs: i }) => f(li, {
	...i,
	...n,
	iconNode: t,
	name: e
}, r), di = ui("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), fi = ui("circle-dot", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "1",
	key: "41hilf"
}]]), pi = ui("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]), mi = ui("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), hi = ui("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), gi = ["role", "aria-label"], _i = { class: "min-w-0" }, vi = { class: "block text-sm font-semibold text-ui-foreground" }, yi = { class: "mt-0.5 text-[0.8125rem] leading-5 text-ui-muted-foreground" }, bi = { class: "mt-2 flex min-h-6 flex-wrap items-center gap-2" }, xi = { class: "font-mono text-xs text-ui-muted-foreground" }, Si = /* @__PURE__ */ u({
	__name: "SupervisorStatusBanner",
	props: {
		status: {},
		locale: {}
	},
	setup(e) {
		let t = e, n = r(() => t.locale ?? "en"), a = r(() => Dr(n.value)), l = r(() => t.status.enabled ? t.status.reason_code ? a.value.reason(t.status.reason_code) : t.status.heartbeat_at ? a.value.lastHeartbeat(Tr(t.status.heartbeat_at, t.status.timezone, !0, n.value)) : a.value.noHeartbeat : a.value.disabledMessage), u = r(() => t.status.summary === "recovery_required" || t.status.summary === "unsupported"), d = r(() => t.status.summary === "degraded" || t.status.summary === "stopping"), f = r(() => t.status.summary === "ready"), p = r(() => t.status.summary === "starting"), m = r(() => u.value ? pi : d.value ? hi : f.value ? di : p.value ? mi : fi), g = r(() => u.value ? "border-[rgb(var(--ui-destructive)/0.55)] bg-[rgb(var(--ui-destructive)/0.10)]" : d.value ? "border-[rgb(var(--ui-warning)/0.45)] bg-[rgb(var(--ui-warning)/0.08)]" : f.value ? "border-[rgb(var(--ui-success)/0.40)] bg-[rgb(var(--ui-success)/0.08)]" : p.value ? "border-[rgb(var(--ui-info)/0.40)] bg-[rgb(var(--ui-info)/0.08)]" : "border-ui-border bg-ui-card"), _ = r(() => u.value ? "text-[rgb(var(--ui-destructive))]" : d.value ? "text-[rgb(var(--ui-warning))]" : f.value ? "text-[rgb(var(--ui-success))]" : p.value ? "text-[rgb(var(--ui-info))]" : "text-ui-muted-foreground");
		return (e, r) => (b(), o("section", {
			class: h(["grid min-h-[5.25rem] w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl border px-4 py-3 shadow-sm", g.value]),
			role: u.value ? "alert" : "status",
			"aria-label": a.value.supervisorStatusAriaLabel,
			"data-supervisor-status-banner": ""
		}, [(b(), i(w(m.value), {
			class: h(["mt-0.5 h-5 w-5 shrink-0", _.value]),
			"aria-hidden": "true"
		}, null, 8, ["class"])), s("div", _i, [
			s("strong", vi, T(a.value.supervisorTitle), 1),
			s("p", yi, T(l.value), 1),
			s("div", bi, [s("span", { class: h(["inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold", [g.value, _.value]]) }, [r[0] ||= s("span", {
				class: "h-1.5 w-1.5 rounded-full bg-current",
				"aria-hidden": "true"
			}, null, -1), c(" " + T(E(Or)(t.status.summary, n.value)), 1)], 2), s("span", xi, T(t.status.platform), 1)])
		])], 10, gi));
	}
}), Ci = {
	class: "space-y-5",
	"data-supervisor-overview": ""
}, wi = { class: "flex flex-wrap items-center justify-end gap-2" }, Ti = {
	key: 0,
	class: "space-y-4"
}, Ei = { class: "text-sm text-ui-muted-foreground" }, Di = /* @__PURE__ */ u({
	__name: "SupervisorOverview",
	props: {
		status: {},
		processingGroupId: { default: null },
		processingAction: { default: null },
		locale: { default: "en" },
		showProbeControls: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"refresh",
		"recover",
		"start",
		"stop",
		"restart"
	],
	setup(t, { emit: n }) {
		let u = t, d = r(() => Dr(u.locale)), f = n;
		function p(e) {
			return u.processingGroupId === e ? u.processingAction : null;
		}
		return (t, n) => (b(), o("div", Ci, [
			l(Si, {
				status: u.status,
				locale: u.locale
			}, null, 8, ["status", "locale"]),
			s("div", wi, [u.status.summary === "recovery_required" && u.status.can_recover === !0 ? (b(), i(E(Gn), {
				key: 0,
				variant: "warning",
				loading: u.processingAction === "recover",
				disabled: u.processingAction !== null,
				onClick: n[0] ||= (e) => f("recover")
			}, {
				default: k(() => [c(T(d.value.actions.recover), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])) : a("", !0), l(E(Gn), {
				variant: "secondary",
				loading: u.processingAction === "refresh",
				disabled: u.processingAction !== null,
				onClick: n[1] ||= (e) => f("refresh")
			}, {
				default: k(() => [c(T(d.value.actions.refresh), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])]),
			u.status.groups.length > 0 ? (b(), o("div", Ti, [(b(!0), o(e, null, S(u.status.groups, (e) => (b(), i(ti, {
				key: e.id,
				group: e,
				"processing-action": p(e.id),
				locale: u.locale,
				"show-probe-controls": u.showProbeControls,
				onStart: n[2] ||= (e) => f("start", e),
				onStop: n[3] ||= (e) => f("stop", e),
				onRestart: n[4] ||= (e) => f("restart", e)
			}, null, 8, [
				"group",
				"processing-action",
				"locale",
				"show-probe-controls"
			]))), 128))])) : (b(), i(E(tr), {
				key: 1,
				title: d.value.processGroups
			}, {
				default: k(() => [s("p", Ei, T(d.value.emptyGroups), 1)]),
				_: 1
			}, 8, ["title"]))
		]));
	}
});
//#endregion
export { ti as ProcessGroupCard, Ir as ProcessInstanceTable, Di as SupervisorOverview, Si as SupervisorStatusBanner, Tr as formatDateTime, wr as formatDuration, Ar as instanceColor, Dr as presentationFor, Or as summaryLabel, kr as summaryTone, Er as supervisorPresentation };
