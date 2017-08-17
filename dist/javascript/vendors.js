if (function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" !== type && !jQuery.isWindow(obj) && ("array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) > -1 !== not;
        });
    }
    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur;
    }
    function createOptions(options) {
        var object = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function detach() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed), 
        window.removeEventListener("load", completed)) : (document.detachEvent("onreadystatechange", completed), 
        window.detachEvent("onload", completed));
    }
    function completed() {
        (document.addEventListener || "load" === window.event.type || "complete" === document.readyState) && (detach(), 
        jQuery.ready());
    }
    function dataAttr(elem, key, data) {
        if (void 0 === data && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data || "false" !== data && ("null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data);
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else data = void 0;
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0;
    }
    function internalData(elem, name, data, pvt) {
        if (acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = deletedIds.pop() || jQuery.guid++ : internalKey), 
            cache[id] || (cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            }), "object" != typeof name && "function" != typeof name || (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), 
            thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
            void 0 !== data && (thisCache[jQuery.camelCase(name)] = data), "string" == typeof name ? (ret = thisCache[name], 
            null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [ name ] : (name = jQuery.camelCase(name), 
                    name = name in thisCache ? [ name ] : name.split(" ")), i = name.length;
                    for (;i--; ) delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return;
                }
                (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([ elem ], !0) : support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = void 0);
            }
        }
    }
    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
        } : function() {
            return jQuery.css(elem, prop, "");
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            unit = unit || initialInUnit[3], valueParts = valueParts || [], initialInUnit = +initial || 1;
            do scale = scale || ".5", initialInUnit /= scale, jQuery.style(elem, prop, initialInUnit + unit); while (scale !== (scale = currentValue() / initial) && 1 !== scale && --maxIterations);
        }
        return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], 
        tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), 
        adjusted;
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    function getAll(context, tag) {
        var elems, elem, i = 0, found = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : void 0;
        if (!found) for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
    }
    function buildFragment(elems, context, scripts, selection, ignored) {
        for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; i < l; i++) if (elem = elems[i], 
        elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
            for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
            wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2], 
            j = wrap[0]; j--; ) tmp = tmp.lastChild;
            if (!support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), 
            !support.tbody) for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, 
            j = elem && elem.childNodes.length; j--; ) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
            for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild; ) tmp.removeChild(tmp.firstChild);
            tmp = safe.lastChild;
        } else nodes.push(context.createTextNode(elem));
        for (tmp && safe.removeChild(tmp), support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), 
        i = 0; elem = nodes[i++]; ) if (selection && jQuery.inArray(elem, selection) > -1) ignored && ignored.push(elem); else if (contains = jQuery.contains(elem.ownerDocument, elem), 
        tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
        scripts) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
        return tmp = null, safe;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if ("object" == typeof types) {
            "string" != typeof selector && (data = data || selector, selector = void 0);
            for (type in types) on(elem, type, selector, data, types[type], one);
            return elem;
        }
        if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
        data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return elem;
        return 1 === one && (origFn = fn, fn = function(event) {
            return jQuery().off(event), origFn.apply(this, arguments);
        }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, 
        elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data));
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando);
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, 
            restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), 
            support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, 
            dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue);
        }
    }
    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var first, node, hasScripts, scripts, doc, fragment, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
        if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return collection.each(function(index) {
            var self = collection.eq(index);
            isFunction && (args[0] = value.call(this, index, self.html())), domManip(self, args, callback, ignored);
        });
        if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored), 
        first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
        first || ignored)) {
            for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; i < l; i++) node = fragment, 
            i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
            callback.call(collection[i], node, i);
            if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
            i = 0; i < hasScripts; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
            fragment = first = null;
        }
        return collection;
    }
    function remove(elem, selector, keepData) {
        for (var node, elems = selector ? jQuery.filter(selector, elem) : elem, i = 0; null != (node = elems[i]); i++) keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)), 
        node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")), 
        node.parentNode.removeChild(node));
        return elem;
    }
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write(), 
        doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), 
        display;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(name) {
        if (name in emptyStyle) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in emptyStyle) return name;
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], 
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; index < length; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; i < 4; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (val <= 0 || null == val) {
            if (val = curCSS(elem, name, styles), (val < 0 || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return window.setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; index < length; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", support.shrinkWrapBlocks() || anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), percent < 1 && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {},
                easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                return gotoEnd ? (deferred.notifyWith(elem, [ animation, 1, 0 ]), deferred.resolveWith(elem, [ animation, gotoEnd ])) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); index < length; index++) if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return jQuery.isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)), 
        result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function getClass(elem) {
        return jQuery.attr(elem, "class") || "";
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType.charAt(0) ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType];
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function getDisplay(elem) {
        return elem.style && elem.style.display || jQuery.css(elem, "display");
    }
    function filterHidden(elem) {
        if (!jQuery.contains(elem.ownerDocument || document, elem)) return !0;
        for (;elem && 1 === elem.nodeType; ) {
            if ("none" === getDisplay(elem) || "hidden" === elem.type) return !0;
            elem = elem.parentNode;
        }
        return !1;
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v && null != v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && (elem.defaultView || elem.parentWindow);
    }
    var deletedIds = [], document = window.document, slice = deletedIds.slice, concat = deletedIds.concat, push = deletedIds.push, indexOf = deletedIds.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, version = "1.12.4", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback) {
            return jQuery.each(this, callback);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj);
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window;
        },
        isNumeric: function(obj) {
            var realStringObj = obj && obj.toString();
            return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            if (!support.ownFirst) for (key in obj) return hasOwn.call(obj, key);
            for (key in obj) ;
            return void 0 === key || hasOwn.call(obj, key);
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) for (length = obj.length; i < length && callback.call(obj[i], i, obj[i]) !== !1; i++) ; else for (i in obj) if (callback.call(obj[i], i, obj[i]) === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) return indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? i < 0 ? Math.max(0, len + i) : i : 0; i < len; i++) if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; j < len; ) first[i++] = second[j++];
            if (len !== len) for (;void 0 !== second[j]; ) first[i++] = second[j++];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) for (length = elems.length; i < length; i++) value = callback(elems[i], i, arg), 
            null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            if ("string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn)) return args = slice.call(arguments, 2), 
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy;
        },
        now: function() {
            return +new Date();
        },
        support: support
    }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = deletedIds[Symbol.iterator]), 
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            if (results = results || [], "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, documentIsHTML)) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (!(elem = context.getElementById(m))) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (1 !== nodeType) newContext = context, newSelector = selector; else if ("object" !== context.nodeName.toLowerCase()) {
                        for ((nid = context.getAttribute("id")) ? nid = nid.replace(rescape, "\\$&") : context.setAttribute("id", nid = expando), 
                        groups = tokenize(selector), i = groups.length, nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']"; i--; ) groups[i] = nidselect + " " + toSelector(groups[i]);
                        newSelector = groups.join(","), newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        nid === expando && context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = arr.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), 
                    (oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (uniqueCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++) (elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), 
            mapped && map.push(i)));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; i < len; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context === document || context || outermost); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0, context || elem.ownerDocument === document || (setDocument(elem), xml = !documentIsHTML); matcher = elementMatchers[j++]; ) if (matcher(elem, context || document, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; i < len; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return !!documentElement && "HTML" !== documentElement.nodeName;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = document.documentElement, documentIsHTML = !isXML(document), (parent = document.defaultView) && parent.top !== parent && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), 
            support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), 
            support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                if ("undefined" != typeof context.getElementsByClassName && documentIsHTML) return context.getElementsByClassName(className);
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(div) {
                var input = document.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, document) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-"));
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = !1;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (node = parent, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), 
                                cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    uniqueCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (node = elem, outerCache = node[expando] || (node[expando] = {}), 
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], 
                            nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex), diff === !1) for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}), 
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), uniqueCache[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; i < length; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML) return elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, 
    jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
    var dir = function(elem, dir, until) {
        for (var matched = [], truncate = void 0 !== until; (elem = elem[dir]) && 9 !== elem.nodeType; ) if (1 === elem.nodeType) {
            if (truncate && jQuery(elem).is(until)) break;
            matched.push(elem);
        }
        return matched;
    }, siblings = function(n, elem) {
        for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n);
        return matched;
    }, rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; i < len; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) return this;
        if (root = root || rootjQuery, "string" == typeof selector) {
            if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                if (elem.id !== match[2]) return rootjQuery.find(selector);
                this.length = 1, this[0] = elem;
            }
            return this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof root.ready ? root.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; i < l; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return siblings(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
            this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.uniqueSort(ret)), rparentsprev.test(name) && (ret = ret.reverse())), 
            this.pushStack(ret);
        };
    });
    var rnotwhite = /\S+/g;
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            for (locked = options.once, fired = firing = !0; queue.length; firingIndex = -1) for (memory = queue.shift(); ++firingIndex < list.length; ) list[firingIndex].apply(memory[0], memory[1]) === !1 && options.stopOnFalse && (firingIndex = list.length, 
            memory = !1);
            options.memory || (memory = !1), firing = !1, locked && (list = memory ? [] : "");
        }, self = {
            add: function() {
                return list && (memory && !firing && (firingIndex = list.length - 1, queue.push(memory)), 
                function add(args) {
                    jQuery.each(args, function(_, arg) {
                        jQuery.isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== jQuery.type(arg) && add(arg);
                    });
                }(arguments), memory && !firing && fire()), this;
            },
            remove: function() {
                return jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    index <= firingIndex && firingIndex--;
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            empty: function() {
                return list && (list = []), this;
            },
            disable: function() {
                return locked = queue = [], list = memory = "", this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return locked = !0, memory || self.disable(), this;
            },
            locked: function() {
                return !!locked;
            },
            fireWith: function(context, args) {
                return locked || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                queue.push(args), firing || fire()), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); i < length; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
            jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))));
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll) window.setTimeout(jQuery.ready); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed), 
        window.addEventListener("load", completed); else {
            document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement;
            } catch (e) {}
            top && top.doScroll && !function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left");
                    } catch (e) {
                        return window.setTimeout(doScrollCheck, 50);
                    }
                    detach(), jQuery.ready();
                }
            }();
        }
        return readyList.promise(obj);
    }, jQuery.ready.promise();
    var i;
    for (i in jQuery(support)) break;
    support.ownFirst = "0" === i, support.inlineBlockNeedsLayout = !1, jQuery(function() {
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), 
        container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        body.appendChild(container).appendChild(div), "undefined" != typeof div.style.zoom && (div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        support.inlineBlockNeedsLayout = val = 3 === div.offsetWidth, val && (body.style.zoom = 1)), 
        body.removeChild(container));
    }), function() {
        var div = document.createElement("div");
        support.deleteExpando = !0;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = !1;
        }
        div = null;
    }();
    var acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()], nodeType = +elem.nodeType || 1;
        return (1 === nodeType || 9 === nodeType) && (!noData || noData !== !0 && elem.getAttribute("classid") === noData);
    }, rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], 
            !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    jQuery._data(elem, "parsedAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key);
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : void 0;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) return type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || [];
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    }), function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (null != shrinkWrapBlocksVal) return shrinkWrapBlocksVal;
            shrinkWrapBlocksVal = !1;
            var div, body, container;
            return body = document.getElementsByTagName("body")[0], body && body.style ? (div = document.createElement("div"), 
            container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            body.appendChild(container).appendChild(div), "undefined" != typeof div.style.zoom && (div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
            div.appendChild(document.createElement("div")).style.width = "5px", shrinkWrapBlocksVal = 3 !== div.offsetWidth), 
            body.removeChild(container), shrinkWrapBlocksVal) : void 0;
        };
    }();
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, length = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;i < length; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    }, rcheckableType = /^(?:checkbox|radio)$/i, rtagName = /<([\w:-]+)/, rscriptType = /^$|\/(?:java|ecma)script/i, rleadingWhitespace = /^\s+/, nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    !function() {
        var div = document.createElement("div"), fragment = document.createDocumentFragment(), input = document.createElement("input");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody").length, 
        support.htmlSerialize = !!div.getElementsByTagName("link").length, support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML, 
        input.type = "checkbox", input.checked = !0, fragment.appendChild(input), support.appendChecked = input.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue, 
        fragment.appendChild(div), input = document.createElement("input"), input.setAttribute("type", "radio"), 
        input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), 
        support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, support.noCloneEvent = !!div.addEventListener, 
        div[jQuery.expando] = 1, support.attributes = !div.getAttribute(jQuery.expando);
    }();
    var wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td;
    var rhtml = /<|&#?\w+;/, rtbody = /<tbody/i;
    !function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) eventName = "on" + i, (support[i] = eventName in window) || (div.setAttribute(eventName, "t"), 
        support[i] = div.attributes[eventName].expando === !1);
        div = null;
    }();
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
                handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return "undefined" == typeof jQuery || e && jQuery.event.triggered === e.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
                }, eventHandle.elem = elem), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
                type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                jQuery.event.global[type] = !0);
                elem = null;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                    try {
                        elem[type]();
                    } catch (e) {}
                    jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp);
                }
                return event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) event.rnamespace && !event.rnamespace.test(handleObj.namespace) || (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && ("click" !== event.type || isNaN(event.button) || event.button < 1)) for (;cur != this; cur = cur.parentNode || this) if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                for (matches = [], i = 0; i < delegateCount; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), 
                    !1;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0
            });
            jQuery.event.trigger(e, null, elem), e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle);
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && ("undefined" == typeof elem[name] && (elem[name] = null), elem.detachEvent(name, handle));
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.submit || (jQuery.event.special.submit = {
        setup: function() {
            return !jQuery.nodeName(this, "form") && void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? jQuery.prop(elem, "form") : void 0;
                form && !jQuery._data(form, "submit") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submitBubble = !0;
                }), jQuery._data(form, "submit", !0));
            });
        },
        postDispatch: function(event) {
            event._submitBubble && (delete event._submitBubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event));
        },
        teardown: function() {
            return !jQuery.nodeName(this, "form") && void jQuery.event.remove(this, "._submit");
        }
    }), support.change || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._justChanged = !0);
            }), jQuery.event.add(this, "click._change", function(event) {
                this._justChanged && !event.isTrigger && (this._justChanged = !1), jQuery.event.simulate("change", this, event);
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "change") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event);
                }), jQuery._data(elem, "change", !0));
            });
        },
        handle: function(event) {
            var elem = event.target;
            if (this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type) return event.handleObj.handler.apply(this, arguments);
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
        }
    }), support.focusin || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), jQuery._data(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
                attaches ? jQuery._data(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                jQuery._removeData(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return selector !== !1 && "function" != typeof selector || (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) return jQuery.event.trigger(type, data, elem, !0);
        }
    });
    var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    jQuery.extend({
        htmlPrefilter: function(html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, 
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(support.noCloneEvent && support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            destElements = srcElements = node = null, clone;
        },
        cleanData: function(elems, forceAcceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, attributes = support.attributes, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((forceAcceptData || acceptData(elem)) && (id = elem[internalKey], 
            data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], attributes || "undefined" == typeof elem.removeAttribute ? elem[internalKey] = void 0 : elem.removeAttribute(internalKey), 
                deletedIds.push(id));
            }
        }
    }), jQuery.fn.extend({
        domManip: domManip,
        detach: function(selector) {
            return remove(this, selector, !0);
        },
        remove: function(selector) {
            return remove(this, selector);
        },
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return domManip(this, arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return domManip(this, arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild; ) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0);
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : void 0;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (;i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
                var parent = this.parentNode;
                jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)), parent && parent.replaceChild(elem, this));
            }, ignored);
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; i <= last; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {
        HTML: "block",
        BODY: "block"
    }, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    }, documentElement = document.documentElement;
    !function() {
        function computeStyleTests() {
            var contents, divStyle, documentElement = document.documentElement;
            documentElement.appendChild(container), div.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
            pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = !1, pixelMarginRightVal = reliableMarginRightVal = !0, 
            window.getComputedStyle && (divStyle = window.getComputedStyle(div), pixelPositionVal = "1%" !== (divStyle || {}).top, 
            reliableMarginLeftVal = "2px" === (divStyle || {}).marginLeft, boxSizingReliableVal = "4px" === (divStyle || {
                width: "4px"
            }).width, div.style.marginRight = "50%", pixelMarginRightVal = "4px" === (divStyle || {
                marginRight: "4px"
            }).marginRight, contents = div.appendChild(document.createElement("div")), contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            contents.style.marginRight = contents.style.width = "0", div.style.width = "1px", 
            reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents) || {}).marginRight), 
            div.removeChild(contents)), div.style.display = "none", reliableHiddenOffsetsVal = 0 === div.getClientRects().length, 
            reliableHiddenOffsetsVal && (div.style.display = "", div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            div.childNodes[0].style.borderCollapse = "separate", contents = div.getElementsByTagName("td"), 
            contents[0].style.cssText = "margin:0;border:0;padding:0;display:none", reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight, 
            reliableHiddenOffsetsVal && (contents[0].style.display = "", contents[1].style.display = "none", 
            reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight)), documentElement.removeChild(container);
        }
        var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
        div.style && (div.style.cssText = "float:left;opacity:.5", support.opacity = "0.5" === div.style.opacity, 
        support.cssFloat = !!div.style.cssFloat, div.style.backgroundClip = "content-box", 
        div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, 
        container = document.createElement("div"), container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
        div.innerHTML = "", container.appendChild(div), support.boxSizing = "" === div.style.boxSizing || "" === div.style.MozBoxSizing || "" === div.style.WebkitBoxSizing, 
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                return null == pixelPositionVal && computeStyleTests(), reliableHiddenOffsetsVal;
            },
            boxSizingReliable: function() {
                return null == pixelPositionVal && computeStyleTests(), boxSizingReliableVal;
            },
            pixelMarginRight: function() {
                return null == pixelPositionVal && computeStyleTests(), pixelMarginRightVal;
            },
            pixelPosition: function() {
                return null == pixelPositionVal && computeStyleTests(), pixelPositionVal;
            },
            reliableMarginRight: function() {
                return null == pixelPositionVal && computeStyleTests(), reliableMarginRightVal;
            },
            reliableMarginLeft: function() {
                return null == pixelPositionVal && computeStyleTests(), reliableMarginLeftVal;
            }
        }));
    }();
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    window.getComputedStyle ? (getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        return view && view.opener || (view = window), view.getComputedStyle(elem);
    }, curCSS = function(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, 
        "" !== ret && void 0 !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        computed && !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, 
        minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth), 
        void 0 === ret ? ret : ret + "";
    }) : documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle;
    }, curCSS = function(elem, name, computed) {
        var left, rs, rsLeft, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed[name] : void 0, 
        null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
        rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), 
        style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, 
        rsLeft && (rs.left = rsLeft)), void 0 === ret ? ret : ret + "" || "auto";
    });
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/i, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ], emptyStyle = document.createElement("div").style;
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value) return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret), 
                type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                !(hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra))))) try {
                    style[name] = value;
                } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || isFinite(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) return rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra);
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), 
            "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity);
        }
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) return swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]);
    }), jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
        if (computed) return (parseFloat(curCSS(elem, "marginLeft")) || (jQuery.contains(elem.ownerDocument, elem) ? elem.getBoundingClientRect().left - swap(elem, {
            marginLeft: 0
        }, function() {
            return elem.getBoundingClientRect().left;
        }) : 0)) + "px";
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || jQuery.easing._default, 
            this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0);
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            "*": [ function(prop, value) {
                var tween = this.createTween(prop, value);
                return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween), tween;
            } ]
        },
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.match(rnotwhite);
            for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], 
            Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback);
        },
        prefilters: [ defaultPrefilter ],
        prefilter: function(callback, prepend) {
            prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        null != opt.queue && opt.queue !== !0 || (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || jQuery._data(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                !dequeue && gotoEnd || jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        window.clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function() {
                window.clearTimeout(timeout);
            };
        });
    }, function() {
        var a, input = document.createElement("input"), div = document.createElement("div"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        div = document.createElement("div"), div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = div.getElementsByTagName("a")[0], input.setAttribute("type", "checkbox"), div.appendChild(input), 
        a = div.getElementsByTagName("a")[0], a.style.cssText = "top:1px", support.getSetAttribute = "t" !== div.className, 
        support.style = /top/.test(a.getAttribute("style")), support.hrefNormalized = "/a" === a.getAttribute("href"), 
        support.checkOn = !!input.value, support.optSelected = opt.selected, support.enctype = !!document.createElement("form").enctype, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), 
        input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value;
    }();
    var rreturn = /\r/g, rspaces = /[\x20\t\r\n\f]+/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0; i < max; i++) if (option = options[i], 
                    (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) if (option = options[i], 
                    jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) try {
                        option.selected = optionSet = !0;
                    } catch (_) {
                        option.scrollHeight;
                    } else option.selected = !1;
                    return optionSet || (elem.selectedIndex = -1), options;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType) return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret));
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""), 
            elem.removeAttribute(getSetAttribute ? name : propName);
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        getSetInput && getSetAttribute || !ruseDefault.test(name) ? attrHandle[name] = function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        } : attrHandle[name] = function(elem, name, isXML) {
            if (!isXML) return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
        };
    }), getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void (elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name);
        }
    }), getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            if (ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), 
            ret.value = value += "", "value" === name || value === elem.getAttribute(name)) return value;
        }
    }, attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
        var ret;
        if (!isXML) return (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null;
    }, jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            if (ret && ret.specified) return ret.value;
        },
        set: nodeHook.set
    }, jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" !== value && value, name);
        }
    }, jQuery.each([ "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                if ("" === value) return elem.setAttribute(name, "auto"), value;
            }
        };
    })), support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || void 0;
        },
        set: function(elem, value) {
            return elem.style.cssText = value + "";
        }
    });
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = void 0, delete this[name];
                } catch (e) {}
            });
        }
    }), jQuery.extend({
        prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (3 !== nType && 8 !== nType && 2 !== nType) return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, 
            hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), support.hrefNormalized || jQuery.each([ "href", "src" ], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4);
            }
        };
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
            null;
        },
        set: function(elem) {
            var parent = elem.parentNode;
            parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex);
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    }), support.enctype || (jQuery.propFix.enctype = "encoding");
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, getClass(this)));
            });
            if ("string" == typeof value && value) for (classes = value.match(rnotwhite) || []; elem = this[i++]; ) if (curValue = getClass(elem), 
            cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), curValue !== finalValue && jQuery.attr(elem, "class", finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, getClass(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof value && value) for (classes = value.match(rnotwhite) || []; elem = this[i++]; ) if (curValue = getClass(elem), 
            cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") > -1; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = jQuery.trim(cur), curValue !== finalValue && jQuery.attr(elem, "class", finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
            }) : this.each(function() {
                var className, i, self, classNames;
                if ("string" === type) for (i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else void 0 !== value && "boolean" !== type || (className = getClass(this), 
                className && jQuery._data(this, "__className__", className), jQuery.attr(this, "class", className || value === !1 ? "" : jQuery._data(this, "__className__") || ""));
            });
        },
        hasClass: function(selector) {
            var className, elem, i = 0;
            for (className = " " + selector + " "; elem = this[i++]; ) if (1 === elem.nodeType && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) return !0;
            return !1;
        }
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    var location = window.location, nonce = jQuery.now(), rquery = /\?/, rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse) return window.JSON.parse(data + "");
        var requireNonComma, depth = null, str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            return requireNonComma && comma && (depth = 0), 0 === depth ? token : (requireNonComma = open || comma, 
            depth += !close - !open, "");
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            window.DOMParser ? (tmp = new window.DOMParser(), xml = tmp.parseFromString(data, "text/xml")) : (xml = new window.ActiveXObject("Microsoft.XMLDOM"), 
            xml.async = "false", xml.loadXML(data));
        } catch (e) {
            xml = void 0;
        }
        return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), ajaxLocation = location.href, ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && window.clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && status < 300 || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, 
                jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (state < 2) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                if (jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                2 === state) return jqXHR;
                s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(state < 2)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return support.reliableHiddenOffsets() ? elem.offsetWidth <= 0 && elem.offsetHeight <= 0 && !elem.getClientRects().length : filterHidden(elem);
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
        return this.isLocal ? createActiveXHR() : document.documentMode > 8 ? createStandardXHR() : /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key](void 0, !0);
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, xhrSupported = support.ajax = !!xhrSupported, 
    xhrSupported && jQuery.ajaxTransport(function(options) {
        if (!options.crossDomain || support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                    options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                    options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) void 0 !== headers[i] && xhr.setRequestHeader(i, headers[i] + "");
                    xhr.send(options.hasContent && options.data || null), callback = function(_, isAbort) {
                        var status, statusText, responses;
                        if (callback && (isAbort || 4 === xhr.readyState)) if (delete xhrCallbacks[id], 
                        callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) 4 !== xhr.readyState && xhr.abort(); else {
                            responses = {}, status = xhr.status, "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                            try {
                                statusText = xhr.statusText;
                            } catch (e) {
                                statusText = "";
                            }
                            status || !options.isLocal || options.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                        }
                        responses && complete(status, statusText, responses, xhr.getAllResponseHeaders());
                    }, options.async ? 4 === xhr.readyState ? window.setTimeout(callback) : xhr.onreadystatechange = xhrCallbacks[id] = callback : callback();
                },
                abort: function() {
                    callback && callback(void 0, !0);
                }
            };
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), 
                    script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, 
                        script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"));
                    }, head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    script && script.onload(void 0, !0);
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten, 
            s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), 
            responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script";
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, type, response, self = this, off = url.indexOf(" ");
        return off > -1 && (selector = jQuery.trim(url.slice(off, url.length)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type || "GET",
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).always(callback && function(jqXHR, status) {
            self.each(function() {
                callback.apply(this, response || [ jqXHR.responseText, status, jqXHR ]);
            });
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    }, jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))), 
            null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, box = {
                top: 0,
                left: 0
            }, elem = this[0], doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? ("undefined" != typeof elem.getBoundingClientRect && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || documentElement;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.extend({
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, noGlobal || (window.jQuery = window.$ = jQuery), jQuery;
}), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function($) {
    "use strict";
    var version = $.fn.jquery.split(" ")[0].split(".");
    if (version[0] < 2 && version[1] < 9 || 1 == version[0] && 9 == version[1] && version[2] < 1 || version[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery), +function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement("bootstrap"), transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) if (void 0 !== el.style[name]) return {
            end: transEndEventNames[name]
        };
        return !1;
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = !1, $el = this;
        $(this).one("bsTransitionEnd", function() {
            called = !0;
        });
        var callback = function() {
            called || $($el).trigger($.support.transition.end);
        };
        return setTimeout(callback, duration), this;
    }, $(function() {
        $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            }
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.alert");
            data || $this.data("bs.alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
        $(el).on("click", dismiss, this.close);
    };
    Alert.VERSION = "3.3.7", Alert.TRANSITION_DURATION = 150, Alert.prototype.close = function(e) {
        function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove();
        }
        var $this = $(this), selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = $("#" === selector ? [] : selector);
        e && e.preventDefault(), $parent.length || ($parent = $this.closest(".alert")), 
        $parent.trigger(e = $.Event("close.bs.alert")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
        $.support.transition && $parent.hasClass("fade") ? $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement());
    };
    var old = $.fn.alert;
    $.fn.alert = Plugin, $.fn.alert.Constructor = Alert, $.fn.alert.noConflict = function() {
        return $.fn.alert = old, this;
    }, $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.button"), options = "object" == typeof option && option;
            data || $this.data("bs.button", data = new Button(this, options)), "toggle" == option ? data.toggle() : option && data.setState(option);
        });
    }
    var Button = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Button.DEFAULTS, options), 
        this.isLoading = !1;
    };
    Button.VERSION = "3.3.7", Button.DEFAULTS = {
        loadingText: "loading..."
    }, Button.prototype.setState = function(state) {
        var d = "disabled", $el = this.$element, val = $el.is("input") ? "val" : "html", data = $el.data();
        state += "Text", null == data.resetText && $el.data("resetText", $el[val]()), setTimeout($.proxy(function() {
            $el[val](null == data[state] ? this.options[state] : data[state]), "loadingText" == state ? (this.isLoading = !0, 
            $el.addClass(d).attr(d, d).prop(d, !0)) : this.isLoading && (this.isLoading = !1, 
            $el.removeClass(d).removeAttr(d).prop(d, !1));
        }, this), 0);
    }, Button.prototype.toggle = function() {
        var changed = !0, $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
            var $input = this.$element.find("input");
            "radio" == $input.prop("type") ? ($input.prop("checked") && (changed = !1), $parent.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == $input.prop("type") && ($input.prop("checked") !== this.$element.hasClass("active") && (changed = !1), 
            this.$element.toggleClass("active")), $input.prop("checked", this.$element.hasClass("active")), 
            changed && $input.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var old = $.fn.button;
    $.fn.button = Plugin, $.fn.button.Constructor = Button, $.fn.button.noConflict = function() {
        return $.fn.button = old, this;
    }, $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target).closest(".btn");
        Plugin.call($btn, "toggle"), $(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(), 
        $btn.is("input,button") ? $btn.trigger("focus") : $btn.find("input:visible,button:visible").first().trigger("focus"));
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.carousel"), options = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof option && option), action = "string" == typeof option ? option : options.slide;
            data || $this.data("bs.carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) : action ? data[action]() : options.interval && data.pause().cycle();
        });
    }
    var Carousel = function(element, options) {
        this.$element = $(element), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = options, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
    };
    Carousel.VERSION = "3.3.7", Carousel.TRANSITION_DURATION = 600, Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, Carousel.prototype.keydown = function(e) {
        if (!/input|textarea/i.test(e.target.tagName)) {
            switch (e.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            e.preventDefault();
        }
    }, Carousel.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), 
        this;
    }, Carousel.prototype.getItemIndex = function(item) {
        return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active);
    }, Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active), willWrap = "prev" == direction && 0 === activeIndex || "next" == direction && activeIndex == this.$items.length - 1;
        if (willWrap && !this.options.wrap) return active;
        var delta = "prev" == direction ? -1 : 1, itemIndex = (activeIndex + delta) % this.$items.length;
        return this.$items.eq(itemIndex);
    }, Carousel.prototype.to = function(pos) {
        var that = this, activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(pos > this.$items.length - 1 || pos < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            that.to(pos);
        }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
    }, Carousel.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, Carousel.prototype.next = function() {
        if (!this.sliding) return this.slide("next");
    }, Carousel.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev");
    }, Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active"), $next = next || this.getItemForDirection(type, $active), isCycling = this.interval, direction = "next" == type ? "left" : "right", that = this;
        if ($next.hasClass("active")) return this.sliding = !1;
        var relatedTarget = $next[0], slideEvent = $.Event("slide.bs.carousel", {
            relatedTarget: relatedTarget,
            direction: direction
        });
        if (this.$element.trigger(slideEvent), !slideEvent.isDefaultPrevented()) {
            if (this.sliding = !0, isCycling && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active");
            }
            var slidEvent = $.Event("slid.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            return $.support.transition && this.$element.hasClass("slide") ? ($next.addClass(type), 
            $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), $active.one("bsTransitionEnd", function() {
                $next.removeClass([ type, direction ].join(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")), 
                that.sliding = !1, setTimeout(function() {
                    that.$element.trigger(slidEvent);
                }, 0);
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)) : ($active.removeClass("active"), 
            $next.addClass("active"), this.sliding = !1, this.$element.trigger(slidEvent)), 
            isCycling && this.cycle(), this;
        }
    };
    var old = $.fn.carousel;
    $.fn.carousel = Plugin, $.fn.carousel.Constructor = Carousel, $.fn.carousel.noConflict = function() {
        return $.fn.carousel = old, this;
    };
    var clickHandler = function(e) {
        var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
        if ($target.hasClass("carousel")) {
            var options = $.extend({}, $target.data(), $this.data()), slideIndex = $this.attr("data-slide-to");
            slideIndex && (options.interval = !1), Plugin.call($target, options), slideIndex && $target.data("bs.carousel").to(slideIndex), 
            e.preventDefault();
        }
    };
    $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler), 
    $(window).on("load", function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            Plugin.call($carousel, $carousel.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function getTargetFromTrigger($trigger) {
        var href, target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        return $(target);
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.collapse"), options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof option && option);
            !data && options.toggle && /show|hide/.test(option) && (options.toggle = !1), data || $this.data("bs.collapse", data = new Collapse(this, options)), 
            "string" == typeof option && data[option]();
        });
    }
    var Collapse = function(element, options) {
        this.$element = $(element), this.options = $.extend({}, Collapse.DEFAULTS, options), 
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    Collapse.VERSION = "3.3.7", Collapse.TRANSITION_DURATION = 350, Collapse.DEFAULTS = {
        toggle: !0
    }, Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    }, Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var activesData, actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(actives && actives.length && (activesData = actives.data("bs.collapse"), activesData && activesData.transitioning))) {
                var startEvent = $.Event("show.bs.collapse");
                if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                    actives && actives.length && (Plugin.call(actives, "hide"), activesData || actives.data("bs.collapse", null));
                    var dimension = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var complete = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[dimension](""), 
                        this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                    };
                    if (!$.support.transition) return complete.call(this);
                    var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
                    this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
                }
            }
        }
    }, Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var startEvent = $.Event("hide.bs.collapse");
            if (this.$element.trigger(startEvent), !startEvent.isDefaultPrevented()) {
                var dimension = this.dimension();
                this.$element[dimension](this.$element[dimension]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var complete = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return $.support.transition ? void this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION) : complete.call(this);
            }
        }
    }, Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
            var $element = $(element);
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
    }, Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass("in");
        $element.attr("aria-expanded", isOpen), $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
    };
    var old = $.fn.collapse;
    $.fn.collapse = Plugin, $.fn.collapse.Constructor = Collapse, $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old, this;
    }, $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        $this.attr("data-target") || e.preventDefault();
        var $target = getTargetFromTrigger($this), data = $target.data("bs.collapse"), option = data ? "toggle" : $this.data();
        Plugin.call($target, option);
    });
}(jQuery), +function($) {
    "use strict";
    function getParent($this) {
        var selector = $this.attr("data-target");
        selector || (selector = $this.attr("href"), selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ""));
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
    }
    function clearMenus(e) {
        e && 3 === e.which || ($(backdrop).remove(), $(toggle).each(function() {
            var $this = $(this), $parent = getParent($this), relatedTarget = {
                relatedTarget: this
            };
            $parent.hasClass("open") && (e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target) || ($parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget)), 
            e.isDefaultPrevented() || ($this.attr("aria-expanded", "false"), $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", relatedTarget)))));
        }));
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.dropdown");
            data || $this.data("bs.dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
        });
    }
    var backdrop = ".dropdown-backdrop", toggle = '[data-toggle="dropdown"]', Dropdown = function(element) {
        $(element).on("click.bs.dropdown", this.toggle);
    };
    Dropdown.VERSION = "3.3.7", Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this), isActive = $parent.hasClass("open");
            if (clearMenus(), !isActive) {
                "ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length && $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
                var relatedTarget = {
                    relatedTarget: this
                };
                if ($parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget)), e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true"), $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", relatedTarget));
            }
            return !1;
        }
    }, Dropdown.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var $this = $(this);
            if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
                var $parent = getParent($this), isActive = $parent.hasClass("open");
                if (!isActive && 27 != e.which || isActive && 27 == e.which) return 27 == e.which && $parent.find(toggle).trigger("focus"), 
                $this.trigger("click");
                var desc = " li:not(.disabled):visible a", $items = $parent.find(".dropdown-menu" + desc);
                if ($items.length) {
                    var index = $items.index(e.target);
                    38 == e.which && index > 0 && index--, 40 == e.which && index < $items.length - 1 && index++, 
                    ~index || (index = 0), $items.eq(index).trigger("focus");
                }
            }
        }
    };
    var old = $.fn.dropdown;
    $.fn.dropdown = Plugin, $.fn.dropdown.Constructor = Dropdown, $.fn.dropdown.noConflict = function() {
        return $.fn.dropdown = old, this;
    }, $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation();
    }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.modal"), options = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof option && option);
            data || $this.data("bs.modal", data = new Modal(this, options)), "string" == typeof option ? data[option](_relatedTarget) : options.show && data.show(_relatedTarget);
        });
    }
    var Modal = function(element, options) {
        this.options = options, this.$body = $(document.body), this.$element = $(element), 
        this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, 
        this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, 
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    Modal.VERSION = "3.3.7", Modal.TRANSITION_DURATION = 300, Modal.BACKDROP_TRANSITION_DURATION = 150, 
    Modal.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    }, Modal.prototype.show = function(_relatedTarget) {
        var that = this, e = $.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                $(e.target).is(that.$element) && (that.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass("fade");
            that.$element.parent().length || that.$element.appendTo(that.$body), that.$element.show().scrollTop(0), 
            that.adjustDialog(), transition && that.$element[0].offsetWidth, that.$element.addClass("in"), 
            that.enforceFocus();
            var e = $.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$dialog.one("bsTransitionEnd", function() {
                that.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
        }));
    }, Modal.prototype.hide = function(e) {
        e && e.preventDefault(), e = $.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        $(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal());
    }, Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus");
        }, this));
    }, Modal.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
            27 == e.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, Modal.prototype.resize = function() {
        this.isShown ? $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this)) : $(window).off("resize.bs.modal");
    }, Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide(), this.backdrop(function() {
            that.$body.removeClass("modal-open"), that.resetAdjustments(), that.resetScrollbar(), 
            that.$element.trigger("hidden.bs.modal");
        });
    }, Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, Modal.prototype.backdrop = function(callback) {
        var that = this, animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), 
            !callback) return;
            doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var callbackRemove = function() {
                that.removeBackdrop(), callback && callback();
            };
            $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else callback && callback();
    }, Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
        });
    }, Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth, this.scrollbarWidth = this.measureScrollbar();
    }, Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
    }, Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "modal-scrollbar-measure", this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        return this.$body[0].removeChild(scrollDiv), scrollbarWidth;
    };
    var old = $.fn.modal;
    $.fn.modal = Plugin, $.fn.modal.Constructor = Modal, $.fn.modal.noConflict = function() {
        return $.fn.modal = old, this;
    }, $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this), href = $this.attr("href"), $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("bs.modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        $this.is("a") && e.preventDefault(), $target.one("show.bs.modal", function(showEvent) {
            showEvent.isDefaultPrevented() || $target.one("hidden.bs.modal", function() {
                $this.is(":visible") && $this.trigger("focus");
            });
        }), Plugin.call($target, option, this);
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tooltip"), options = "object" == typeof option && option;
            !data && /destroy|hide/.test(option) || (data || $this.data("bs.tooltip", data = new Tooltip(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Tooltip = function(element, options) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", element, options);
    };
    Tooltip.VERSION = "3.3.7", Tooltip.TRANSITION_DURATION = 150, Tooltip.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, Tooltip.prototype.init = function(type, element, options) {
        if (this.enabled = !0, this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var triggers = this.options.trigger.split(" "), i = triggers.length; i--; ) {
            var trigger = triggers[i];
            if ("click" == trigger) this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this)); else if ("manual" != trigger) {
                var eventIn = "hover" == trigger ? "mouseenter" : "focusin", eventOut = "hover" == trigger ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this)), 
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = $.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
    }, Tooltip.prototype.getOptions = function(options) {
        return options = $.extend({}, this.getDefaults(), this.$element.data(), options), 
        options.delay && "number" == typeof options.delay && (options.delay = {
            show: options.delay,
            hide: options.delay
        }), options;
    }, Tooltip.prototype.getDelegateOptions = function() {
        var options = {}, defaults = this.getDefaults();
        return this._options && $.each(this._options, function(key, value) {
            defaults[key] != value && (options[key] = value);
        }), options;
    }, Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        return self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = !0), 
        self.tip().hasClass("in") || "in" == self.hoverState ? void (self.hoverState = "in") : (clearTimeout(self.timeout), 
        self.hoverState = "in", self.options.delay && self.options.delay.show ? void (self.timeout = setTimeout(function() {
            "in" == self.hoverState && self.show();
        }, self.options.delay.show)) : self.show());
    }, Tooltip.prototype.isInStateTrue = function() {
        for (var key in this.inState) if (this.inState[key]) return !0;
        return !1;
    }, Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), 
        $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = !1), 
        !self.isInStateTrue()) return clearTimeout(self.timeout), self.hoverState = "out", 
        self.options.delay && self.options.delay.hide ? void (self.timeout = setTimeout(function() {
            "out" == self.hoverState && self.hide();
        }, self.options.delay.hide)) : self.hide();
    }, Tooltip.prototype.show = function() {
        var e = $.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !inDom) return;
            var that = this, $tip = this.tip(), tipId = this.getUID(this.type);
            this.setContent(), $tip.attr("id", tipId), this.$element.attr("aria-describedby", tipId), 
            this.options.animation && $tip.addClass("fade");
            var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement, autoToken = /\s?auto?\s?/i, autoPlace = autoToken.test(placement);
            autoPlace && (placement = placement.replace(autoToken, "") || "top"), $tip.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(placement).data("bs." + this.type, this), this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var pos = this.getPosition(), actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
                var orgPlacement = placement, viewportDim = this.getPosition(this.$viewport);
                placement = "bottom" == placement && pos.bottom + actualHeight > viewportDim.bottom ? "top" : "top" == placement && pos.top - actualHeight < viewportDim.top ? "bottom" : "right" == placement && pos.right + actualWidth > viewportDim.width ? "left" : "left" == placement && pos.left - actualWidth < viewportDim.left ? "right" : placement, 
                $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            var complete = function() {
                var prevHoverState = that.hoverState;
                that.$element.trigger("shown.bs." + that.type), that.hoverState = null, "out" == prevHoverState && that.leave(that);
            };
            $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        }
    }, Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, marginTop = parseInt($tip.css("margin-top"), 10), marginLeft = parseInt($tip.css("margin-left"), 10);
        isNaN(marginTop) && (marginTop = 0), isNaN(marginLeft) && (marginLeft = 0), offset.top += marginTop, 
        offset.left += marginLeft, $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                });
            }
        }, offset), 0), $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
        "top" == placement && actualHeight != height && (offset.top = offset.top + height - actualHeight);
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        delta.left ? offset.left += delta.left : offset.top += delta.top;
        var isVertical = /top|bottom/.test(placement), arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight, arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset), this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
    }, Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
    }, Tooltip.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title), $tip.removeClass("fade in top bottom left right");
    }, Tooltip.prototype.hide = function(callback) {
        function complete() {
            "in" != that.hoverState && $tip.detach(), that.$element && that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type), 
            callback && callback();
        }
        var that = this, $tip = $(this.$tip), e = $.Event("hide.bs." + this.type);
        if (this.$element.trigger(e), !e.isDefaultPrevented()) return $tip.removeClass("in"), 
        $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), 
        this.hoverState = null, this;
    }, Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }, Tooltip.prototype.hasContent = function() {
        return this.getTitle();
    }, Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element;
        var el = $element[0], isBody = "BODY" == el.tagName, elRect = el.getBoundingClientRect();
        null == elRect.width && (elRect = $.extend({}, elRect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
        }));
        var isSvg = window.SVGElement && el instanceof window.SVGElement, elOffset = isBody ? {
            top: 0,
            left: 0
        } : isSvg ? null : $element.offset(), scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }, outerDims = isBody ? {
            width: $(window).width(),
            height: $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
    }, Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return "bottom" == placement ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "top" == placement ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : "left" == placement ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
    }, Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0, viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll, bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            topEdgeOffset < viewportDimensions.top ? delta.top = viewportDimensions.top - topEdgeOffset : bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height && (delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset);
        } else {
            var leftEdgeOffset = pos.left - viewportPadding, rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            leftEdgeOffset < viewportDimensions.left ? delta.left = viewportDimensions.left - leftEdgeOffset : rightEdgeOffset > viewportDimensions.right && (delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset);
        }
        return delta;
    }, Tooltip.prototype.getTitle = function() {
        var title, $e = this.$element, o = this.options;
        return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
    }, Tooltip.prototype.getUID = function(prefix) {
        do prefix += ~~(1e6 * Math.random()); while (document.getElementById(prefix));
        return prefix;
    }, Tooltip.prototype.tip = function() {
        if (!this.$tip && (this.$tip = $(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, Tooltip.prototype.enable = function() {
        this.enabled = !0;
    }, Tooltip.prototype.disable = function() {
        this.enabled = !1;
    }, Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, Tooltip.prototype.toggle = function(e) {
        var self = this;
        e && (self = $(e.currentTarget).data("bs." + this.type), self || (self = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        $(e.currentTarget).data("bs." + this.type, self))), e ? (self.inState.click = !self.inState.click, 
        self.isInStateTrue() ? self.enter(self) : self.leave(self)) : self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
    }, Tooltip.prototype.destroy = function() {
        var that = this;
        clearTimeout(this.timeout), this.hide(function() {
            that.$element.off("." + that.type).removeData("bs." + that.type), that.$tip && that.$tip.detach(), 
            that.$tip = null, that.$arrow = null, that.$viewport = null, that.$element = null;
        });
    };
    var old = $.fn.tooltip;
    $.fn.tooltip = Plugin, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.popover"), options = "object" == typeof option && option;
            !data && /destroy|hide/.test(option) || (data || $this.data("bs.popover", data = new Popover(this, options)), 
            "string" == typeof option && data[option]());
        });
    }
    var Popover = function(element, options) {
        this.init("popover", element, options);
    };
    if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");
    Popover.VERSION = "3.3.7", Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype), Popover.prototype.constructor = Popover, 
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
    }, Popover.prototype.setContent = function() {
        var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
        $tip.find(".popover-title")[this.options.html ? "html" : "text"](title), $tip.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof content ? "html" : "append" : "text"](content), 
        $tip.removeClass("fade top bottom left right in"), $tip.find(".popover-title").html() || $tip.find(".popover-title").hide();
    }, Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, Popover.prototype.getContent = function() {
        var $e = this.$element, o = this.options;
        return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
    }, Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var old = $.fn.popover;
    $.fn.popover = Plugin, $.fn.popover.Constructor = Popover, $.fn.popover.noConflict = function() {
        return $.fn.popover = old, this;
    };
}(jQuery), +function($) {
    "use strict";
    function ScrollSpy(element, options) {
        this.$body = $(document.body), this.$scrollElement = $($(element).is(document.body) ? window : element), 
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.scrollspy"), options = "object" == typeof option && option;
            data || $this.data("bs.scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]();
        });
    }
    ScrollSpy.VERSION = "3.3.7", ScrollSpy.DEFAULTS = {
        offset: 10
    }, ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, ScrollSpy.prototype.refresh = function() {
        var that = this, offsetMethod = "offset", offsetBase = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        $.isWindow(this.$scrollElement[0]) || (offsetMethod = "position", offsetBase = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#./.test(href) && $(href);
            return $href && $href.length && $href.is(":visible") && [ [ $href[offsetMethod]().top + offsetBase, href ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            that.offsets.push(this[0]), that.targets.push(this[1]);
        });
    }, ScrollSpy.prototype.process = function() {
        var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.getScrollHeight(), maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
        if (this.scrollHeight != scrollHeight && this.refresh(), scrollTop >= maxScroll) return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
        if (activeTarget && scrollTop < offsets[0]) return this.activeTarget = null, this.clear();
        for (i = offsets.length; i--; ) activeTarget != targets[i] && scrollTop >= offsets[i] && (void 0 === offsets[i + 1] || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }, ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target, this.clear();
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', active = $(selector).parents("li").addClass("active");
        active.parent(".dropdown-menu").length && (active = active.closest("li.dropdown").addClass("active")), 
        active.trigger("activate.bs.scrollspy");
    }, ScrollSpy.prototype.clear = function() {
        $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var old = $.fn.scrollspy;
    $.fn.scrollspy = Plugin, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.noConflict = function() {
        return $.fn.scrollspy = old, this;
    }, $(window).on("load.bs.scrollspy.data-api", function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            Plugin.call($spy, $spy.data());
        });
    });
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.tab");
            data || $this.data("bs.tab", data = new Tab(this)), "string" == typeof option && data[option]();
        });
    }
    var Tab = function(element) {
        this.element = $(element);
    };
    Tab.VERSION = "3.3.7", Tab.TRANSITION_DURATION = 150, Tab.prototype.show = function() {
        var $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.data("target");
        if (selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
        !$this.parent("li").hasClass("active")) {
            var $previous = $ul.find(".active:last a"), hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            }), showEvent = $.Event("show.bs.tab", {
                relatedTarget: $previous[0]
            });
            if ($previous.trigger(hideEvent), $this.trigger(showEvent), !showEvent.isDefaultPrevented() && !hideEvent.isDefaultPrevented()) {
                var $target = $(selector);
                this.activate($this.closest("li"), $ul), this.activate($target, $target.parent(), function() {
                    $previous.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: $this[0]
                    }), $this.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: $previous[0]
                    });
                });
            }
        }
    }, Tab.prototype.activate = function(element, container, callback) {
        function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            transition ? (element[0].offsetWidth, element.addClass("in")) : element.removeClass("fade"), 
            element.parent(".dropdown-menu").length && element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            callback && callback();
        }
        var $active = container.find("> .active"), transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
        $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next(), 
        $active.removeClass("in");
    };
    var old = $.fn.tab;
    $.fn.tab = Plugin, $.fn.tab.Constructor = Tab, $.fn.tab.noConflict = function() {
        return $.fn.tab = old, this;
    };
    var clickHandler = function(e) {
        e.preventDefault(), Plugin.call($(this), "show");
    };
    $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
}(jQuery), +function($) {
    "use strict";
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data("bs.affix"), options = "object" == typeof option && option;
            data || $this.data("bs.affix", data = new Affix(this, options)), "string" == typeof option && data[option]();
        });
    }
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options), this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = $(element), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    Affix.VERSION = "3.3.7", Affix.RESET = "affix affix-top affix-bottom", Affix.DEFAULTS = {
        offset: 0,
        target: window
    }, Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset(), targetHeight = this.$target.height();
        if (null != offsetTop && "top" == this.affixed) return scrollTop < offsetTop && "top";
        if ("bottom" == this.affixed) return null != offsetTop ? !(scrollTop + this.unpin <= position.top) && "bottom" : !(scrollTop + targetHeight <= scrollHeight - offsetBottom) && "bottom";
        var initializing = null == this.affixed, colliderTop = initializing ? scrollTop : position.top, colliderHeight = initializing ? targetHeight : height;
        return null != offsetTop && scrollTop <= offsetTop ? "top" : null != offsetBottom && colliderTop + colliderHeight >= scrollHeight - offsetBottom && "bottom";
    }, Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass("affix");
        var scrollTop = this.$target.scrollTop(), position = this.$element.offset();
        return this.pinnedOffset = position.top - scrollTop;
    }, Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
    }, Affix.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var height = this.$element.height(), offset = this.options.offset, offsetTop = offset.top, offsetBottom = offset.bottom, scrollHeight = Math.max($(document).height(), $(document.body).height());
            "object" != typeof offset && (offsetBottom = offsetTop = offset), "function" == typeof offsetTop && (offsetTop = offset.top(this.$element)), 
            "function" == typeof offsetBottom && (offsetBottom = offset.bottom(this.$element));
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
                null != this.unpin && this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : ""), e = $.Event(affixType + ".bs.affix");
                if (this.$element.trigger(e), e.isDefaultPrevented()) return;
                this.affixed = affix, this.unpin = "bottom" == affix ? this.getPinnedOffset() : null, 
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == affix && this.$element.offset({
                top: scrollHeight - height - offsetBottom
            });
        }
    };
    var old = $.fn.affix;
    $.fn.affix = Plugin, $.fn.affix.Constructor = Affix, $.fn.affix.noConflict = function() {
        return $.fn.affix = old, this;
    }, $(window).on("load", function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this), data = $spy.data();
            data.offset = data.offset || {}, null != data.offsetBottom && (data.offset.bottom = data.offsetBottom), 
            null != data.offsetTop && (data.offset.top = data.offsetTop), Plugin.call($spy, data);
        });
    });
}(jQuery), function($) {
    "use strict";
    function normalizeToBase(text) {
        var rExps = [ {
            re: /[\xC0-\xC6]/g,
            ch: "A"
        }, {
            re: /[\xE0-\xE6]/g,
            ch: "a"
        }, {
            re: /[\xC8-\xCB]/g,
            ch: "E"
        }, {
            re: /[\xE8-\xEB]/g,
            ch: "e"
        }, {
            re: /[\xCC-\xCF]/g,
            ch: "I"
        }, {
            re: /[\xEC-\xEF]/g,
            ch: "i"
        }, {
            re: /[\xD2-\xD6]/g,
            ch: "O"
        }, {
            re: /[\xF2-\xF6]/g,
            ch: "o"
        }, {
            re: /[\xD9-\xDC]/g,
            ch: "U"
        }, {
            re: /[\xF9-\xFC]/g,
            ch: "u"
        }, {
            re: /[\xC7-\xE7]/g,
            ch: "c"
        }, {
            re: /[\xD1]/g,
            ch: "N"
        }, {
            re: /[\xF1]/g,
            ch: "n"
        } ];
        return $.each(rExps, function() {
            text = text ? text.replace(this.re, this.ch) : "";
        }), text;
    }
    function Plugin(option) {
        var args = arguments, _option = option;
        [].shift.apply(args);
        var value, chain = this.each(function() {
            var $this = $(this);
            if ($this.is("select")) {
                var data = $this.data("selectpicker"), options = "object" == typeof _option && _option;
                if (data) {
                    if (options) for (var i in options) options.hasOwnProperty(i) && (data.options[i] = options[i]);
                } else {
                    var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
                    config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, $this.data().template, options.template), 
                    $this.data("selectpicker", data = new Selectpicker(this, config));
                }
                "string" == typeof _option && (value = data[_option] instanceof Function ? data[_option].apply(data, args) : data.options[_option]);
            }
        });
        return "undefined" != typeof value ? value : chain;
    }
    String.prototype.includes || !function() {
        var toString = {}.toString, defineProperty = function() {
            try {
                var object = {}, $defineProperty = Object.defineProperty, result = $defineProperty(object, object, object) && $defineProperty;
            } catch (error) {}
            return result;
        }(), indexOf = "".indexOf, includes = function(search) {
            if (null == this) throw new TypeError();
            var string = String(this);
            if (search && "[object RegExp]" == toString.call(search)) throw new TypeError();
            var stringLength = string.length, searchString = String(search), searchLength = searchString.length, position = arguments.length > 1 ? arguments[1] : void 0, pos = position ? Number(position) : 0;
            pos != pos && (pos = 0);
            var start = Math.min(Math.max(pos, 0), stringLength);
            return !(searchLength + start > stringLength) && indexOf.call(string, searchString, pos) != -1;
        };
        defineProperty ? defineProperty(String.prototype, "includes", {
            value: includes,
            configurable: !0,
            writable: !0
        }) : String.prototype.includes = includes;
    }(), String.prototype.startsWith || !function() {
        var defineProperty = function() {
            try {
                var object = {}, $defineProperty = Object.defineProperty, result = $defineProperty(object, object, object) && $defineProperty;
            } catch (error) {}
            return result;
        }(), toString = {}.toString, startsWith = function(search) {
            if (null == this) throw new TypeError();
            var string = String(this);
            if (search && "[object RegExp]" == toString.call(search)) throw new TypeError();
            var stringLength = string.length, searchString = String(search), searchLength = searchString.length, position = arguments.length > 1 ? arguments[1] : void 0, pos = position ? Number(position) : 0;
            pos != pos && (pos = 0);
            var start = Math.min(Math.max(pos, 0), stringLength);
            if (searchLength + start > stringLength) return !1;
            for (var index = -1; ++index < searchLength; ) if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) return !1;
            return !0;
        };
        defineProperty ? defineProperty(String.prototype, "startsWith", {
            value: startsWith,
            configurable: !0,
            writable: !0
        }) : String.prototype.startsWith = startsWith;
    }(), Object.keys || (Object.keys = function(o, k, r) {
        r = [];
        for (k in o) r.hasOwnProperty.call(o, k) && r.push(k);
        return r;
    });
    var valHooks = {
        useDefault: !1,
        _set: $.valHooks.select.set
    };
    $.valHooks.select.set = function(elem, value) {
        return value && !valHooks.useDefault && $(elem).data("selected", !0), valHooks._set.apply(this, arguments);
    };
    var changed_arguments = null, EventIsSupported = function() {
        try {
            return new Event("change"), !0;
        } catch (e) {
            return !1;
        }
    }();
    $.fn.triggerNative = function(eventName) {
        var event, el = this[0];
        el.dispatchEvent ? (EventIsSupported ? event = new Event(eventName, {
            bubbles: !0
        }) : (event = document.createEvent("Event"), event.initEvent(eventName, !0, !1)), 
        el.dispatchEvent(event)) : el.fireEvent ? (event = document.createEventObject(), 
        event.eventType = eventName, el.fireEvent("on" + eventName, event)) : this.trigger(eventName);
    }, $.expr.pseudos.icontains = function(obj, index, meta) {
        var $obj = $(obj).find("a"), haystack = ($obj.data("tokens") || $obj.text()).toString().toUpperCase();
        return haystack.includes(meta[3].toUpperCase());
    }, $.expr.pseudos.ibegins = function(obj, index, meta) {
        var $obj = $(obj).find("a"), haystack = ($obj.data("tokens") || $obj.text()).toString().toUpperCase();
        return haystack.startsWith(meta[3].toUpperCase());
    }, $.expr.pseudos.aicontains = function(obj, index, meta) {
        var $obj = $(obj).find("a"), haystack = ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toString().toUpperCase();
        return haystack.includes(meta[3].toUpperCase());
    }, $.expr.pseudos.aibegins = function(obj, index, meta) {
        var $obj = $(obj).find("a"), haystack = ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toString().toUpperCase();
        return haystack.startsWith(meta[3].toUpperCase());
    };
    var escapeMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, unescapeMap = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#x27;": "'",
        "&#x60;": "`"
    }, createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        }, source = "(?:" + Object.keys(map).join("|") + ")", testRegexp = RegExp(source), replaceRegexp = RegExp(source, "g");
        return function(string) {
            return string = null == string ? "" : "" + string, testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    }, htmlEscape = createEscaper(escapeMap), htmlUnescape = createEscaper(unescapeMap), Selectpicker = function(element, options) {
        valHooks.useDefault || ($.valHooks.select.set = valHooks._set, valHooks.useDefault = !0), 
        this.$element = $(element), this.$newElement = null, this.$button = null, this.$menu = null, 
        this.$lis = null, this.options = options, null === this.options.title && (this.options.title = this.$element.attr("title"));
        var winPad = this.options.windowPadding;
        "number" == typeof winPad && (this.options.windowPadding = [ winPad, winPad, winPad, winPad ]), 
        this.val = Selectpicker.prototype.val, this.render = Selectpicker.prototype.render, 
        this.refresh = Selectpicker.prototype.refresh, this.setStyle = Selectpicker.prototype.setStyle, 
        this.selectAll = Selectpicker.prototype.selectAll, this.deselectAll = Selectpicker.prototype.deselectAll, 
        this.destroy = Selectpicker.prototype.destroy, this.remove = Selectpicker.prototype.remove, 
        this.show = Selectpicker.prototype.show, this.hide = Selectpicker.prototype.hide, 
        this.init();
    };
    Selectpicker.VERSION = "1.12.4", Selectpicker.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results matched {0}",
        countSelectedText: function(numSelected, numTotal) {
            return 1 == numSelected ? "{0} item selected" : "{0} items selected";
        },
        maxOptionsText: function(numAll, numGroup) {
            return [ 1 == numAll ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == numGroup ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)" ];
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        doneButton: !1,
        doneButtonText: "Close",
        multipleSeparator: ", ",
        styleBase: "btn",
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: !1,
        container: !1,
        hideDisabled: !1,
        showSubtext: !1,
        showIcon: !0,
        showContent: !0,
        dropupAuto: !0,
        header: !1,
        liveSearch: !1,
        liveSearchPlaceholder: null,
        liveSearchNormalize: !1,
        liveSearchStyle: "contains",
        actionsBox: !1,
        iconBase: "glyphicon",
        tickIcon: "glyphicon-ok",
        showTick: !1,
        template: {
            caret: '<span class="caret"></span>'
        },
        maxOptions: !1,
        mobile: !1,
        selectOnTab: !1,
        dropdownAlignRight: !1,
        windowPadding: 0
    }, Selectpicker.prototype = {
        constructor: Selectpicker,
        init: function() {
            var that = this, id = this.$element.attr("id");
            this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), 
            this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), 
            this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), 
            this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), 
            this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), 
            this.options.dropdownAlignRight === !0 && this.$menu.addClass("dropdown-menu-right"), 
            "undefined" != typeof id && (this.$button.attr("data-id", id), $('label[for="' + id + '"]').click(function(e) {
                e.preventDefault(), that.$button.focus();
            })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), 
            this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), 
            this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), 
            this.$newElement.on({
                "hide.bs.dropdown": function(e) {
                    that.$menuInner.attr("aria-expanded", !1), that.$element.trigger("hide.bs.select", e);
                },
                "hidden.bs.dropdown": function(e) {
                    that.$element.trigger("hidden.bs.select", e);
                },
                "show.bs.dropdown": function(e) {
                    that.$menuInner.attr("aria-expanded", !0), that.$element.trigger("show.bs.select", e);
                },
                "shown.bs.dropdown": function(e) {
                    that.$element.trigger("shown.bs.select", e);
                }
            }), that.$element[0].hasAttribute("required") && this.$element.on("invalid", function() {
                that.$button.addClass("bs-invalid"), that.$element.on({
                    "focus.bs.select": function() {
                        that.$button.focus(), that.$element.off("focus.bs.select");
                    },
                    "shown.bs.select": function() {
                        that.$element.val(that.$element.val()).off("shown.bs.select");
                    },
                    "rendered.bs.select": function() {
                        this.validity.valid && that.$button.removeClass("bs-invalid"), that.$element.off("rendered.bs.select");
                    }
                }), that.$button.on("blur.bs.select", function() {
                    that.$element.focus().blur(), that.$button.off("blur.bs.select");
                });
            }), setTimeout(function() {
                that.$element.trigger("loaded.bs.select");
            });
        },
        createDropdown: function() {
            var showTick = this.multiple || this.options.showTick ? " show-tick" : "", inputGroup = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "", autofocus = this.autofocus ? " autofocus" : "", header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "", searchbox = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : "", actionsbox = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "", donebutton = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "", drop = '<div class="btn-group bootstrap-select' + showTick + inputGroup + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open" role="combobox">' + header + searchbox + actionsbox + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' + donebutton + "</div></div>";
            return $(drop);
        },
        createView: function() {
            var $drop = this.createDropdown(), li = this.createLi();
            return $drop.find("ul")[0].innerHTML = li, $drop;
        },
        reloadLi: function() {
            var li = this.createLi();
            this.$menuInner[0].innerHTML = li;
        },
        createLi: function() {
            var that = this, _li = [], optID = 0, titleOption = document.createElement("option"), liIndex = -1, generateLI = function(content, index, classes, optgroup) {
                return "<li" + ("undefined" != typeof classes && "" !== classes ? ' class="' + classes + '"' : "") + ("undefined" != typeof index && null !== index ? ' data-original-index="' + index + '"' : "") + ("undefined" != typeof optgroup && null !== optgroup ? 'data-optgroup="' + optgroup + '"' : "") + ">" + content + "</li>";
            }, generateA = function(text, classes, inline, tokens) {
                return '<a tabindex="0"' + ("undefined" != typeof classes ? ' class="' + classes + '"' : "") + (inline ? ' style="' + inline + '"' : "") + (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape($(text).html())) + '"' : "") + ("undefined" != typeof tokens || null !== tokens ? ' data-tokens="' + tokens + '"' : "") + ' role="option">' + text + '<span class="' + that.options.iconBase + " " + that.options.tickIcon + ' check-mark"></span></a>';
            };
            if (this.options.title && !this.multiple && (liIndex--, !this.$element.find(".bs-title-option").length)) {
                var element = this.$element[0];
                titleOption.className = "bs-title-option", titleOption.innerHTML = this.options.title, 
                titleOption.value = "", element.insertBefore(titleOption, element.firstChild);
                var $opt = $(element.options[element.selectedIndex]);
                void 0 === $opt.attr("selected") && void 0 === this.$element.data("selected") && (titleOption.selected = !0);
            }
            var $selectOptions = this.$element.find("option");
            return $selectOptions.each(function(index) {
                var $this = $(this);
                if (liIndex++, !$this.hasClass("bs-title-option")) {
                    var prevHiddenIndex, optionClass = this.className || "", inline = htmlEscape(this.style.cssText), text = $this.data("content") ? $this.data("content") : $this.html(), tokens = $this.data("tokens") ? $this.data("tokens") : null, subtext = "undefined" != typeof $this.data("subtext") ? '<small class="text-muted">' + $this.data("subtext") + "</small>" : "", icon = "undefined" != typeof $this.data("icon") ? '<span class="' + that.options.iconBase + " " + $this.data("icon") + '"></span> ' : "", $parent = $this.parent(), isOptgroup = "OPTGROUP" === $parent[0].tagName, isOptgroupDisabled = isOptgroup && $parent[0].disabled, isDisabled = this.disabled || isOptgroupDisabled;
                    if ("" !== icon && isDisabled && (icon = "<span>" + icon + "</span>"), that.options.hideDisabled && (isDisabled && !isOptgroup || isOptgroupDisabled)) return prevHiddenIndex = $this.data("prevHiddenIndex"), 
                    $this.next().data("prevHiddenIndex", void 0 !== prevHiddenIndex ? prevHiddenIndex : index), 
                    void liIndex--;
                    if ($this.data("content") || (text = icon + '<span class="text">' + text + subtext + "</span>"), 
                    isOptgroup && $this.data("divider") !== !0) {
                        if (that.options.hideDisabled && isDisabled) {
                            if (void 0 === $parent.data("allOptionsDisabled")) {
                                var $options = $parent.children();
                                $parent.data("allOptionsDisabled", $options.filter(":disabled").length === $options.length);
                            }
                            if ($parent.data("allOptionsDisabled")) return void liIndex--;
                        }
                        var optGroupClass = " " + $parent[0].className || "";
                        if (0 === $this.index()) {
                            optID += 1;
                            var label = $parent[0].label, labelSubtext = "undefined" != typeof $parent.data("subtext") ? '<small class="text-muted">' + $parent.data("subtext") + "</small>" : "", labelIcon = $parent.data("icon") ? '<span class="' + that.options.iconBase + " " + $parent.data("icon") + '"></span> ' : "";
                            label = labelIcon + '<span class="text">' + htmlEscape(label) + labelSubtext + "</span>", 
                            0 !== index && _li.length > 0 && (liIndex++, _li.push(generateLI("", null, "divider", optID + "div"))), 
                            liIndex++, _li.push(generateLI(label, null, "dropdown-header" + optGroupClass, optID));
                        }
                        if (that.options.hideDisabled && isDisabled) return void liIndex--;
                        _li.push(generateLI(generateA(text, "opt " + optionClass + optGroupClass, inline, tokens), index, "", optID));
                    } else if ($this.data("divider") === !0) _li.push(generateLI("", index, "divider")); else if ($this.data("hidden") === !0) prevHiddenIndex = $this.data("prevHiddenIndex"), 
                    $this.next().data("prevHiddenIndex", void 0 !== prevHiddenIndex ? prevHiddenIndex : index), 
                    _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, "hidden is-hidden")); else {
                        var showDivider = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
                        if (!showDivider && that.options.hideDisabled && (prevHiddenIndex = $this.data("prevHiddenIndex"), 
                        void 0 !== prevHiddenIndex)) {
                            var prevHidden = $selectOptions.eq(prevHiddenIndex)[0].previousElementSibling;
                            prevHidden && "OPTGROUP" === prevHidden.tagName && !prevHidden.disabled && (showDivider = !0);
                        }
                        showDivider && (liIndex++, _li.push(generateLI("", null, "divider", optID + "div"))), 
                        _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
                    }
                    that.liObj[index] = liIndex;
                }
            }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), 
            _li.join("");
        },
        findLis: function() {
            return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis;
        },
        render: function(updateLi) {
            var notDisabled, that = this, $selectOptions = this.$element.find("option");
            updateLi !== !1 && $selectOptions.each(function(index) {
                var $lis = that.findLis().eq(that.liObj[index]);
                that.setDisabled(index, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, $lis), 
                that.setSelected(index, this.selected, $lis);
            }), this.togglePlaceholder(), this.tabIndex();
            var selectedItems = $selectOptions.map(function() {
                if (this.selected) {
                    if (that.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                    var subtext, $this = $(this), icon = $this.data("icon") && that.options.showIcon ? '<i class="' + that.options.iconBase + " " + $this.data("icon") + '"></i> ' : "";
                    return subtext = that.options.showSubtext && $this.data("subtext") && !that.multiple ? ' <small class="text-muted">' + $this.data("subtext") + "</small>" : "", 
                    "undefined" != typeof $this.attr("title") ? $this.attr("title") : $this.data("content") && that.options.showContent ? $this.data("content").toString() : icon + $this.html() + subtext;
                }
            }).toArray(), title = this.multiple ? selectedItems.join(this.options.multipleSeparator) : selectedItems[0];
            if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                var max = this.options.selectedTextFormat.split(">");
                if (max.length > 1 && selectedItems.length > max[1] || 1 == max.length && selectedItems.length >= 2) {
                    notDisabled = this.options.hideDisabled ? ", [disabled]" : "";
                    var totalCount = $selectOptions.not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length, tr8nText = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
                    title = tr8nText.replace("{0}", selectedItems.length.toString()).replace("{1}", totalCount.toString());
                }
            }
            void 0 == this.options.title && (this.options.title = this.$element.attr("title")), 
            "static" == this.options.selectedTextFormat && (title = this.options.title), title || (title = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), 
            this.$button.attr("title", htmlUnescape($.trim(title.replace(/<[^>]*>?/g, "")))), 
            this.$button.children(".filter-option").html(title), this.$element.trigger("rendered.bs.select");
        },
        setStyle: function(style, status) {
            this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
            var buttonClass = style ? style : this.options.style;
            "add" == status ? this.$button.addClass(buttonClass) : "remove" == status ? this.$button.removeClass(buttonClass) : (this.$button.removeClass(this.options.style), 
            this.$button.addClass(buttonClass));
        },
        liHeight: function(refresh) {
            if (refresh || this.options.size !== !1 && !this.sizeInfo) {
                var newElement = document.createElement("div"), menu = document.createElement("div"), menuInner = document.createElement("ul"), divider = document.createElement("li"), li = document.createElement("li"), a = document.createElement("a"), text = document.createElement("span"), header = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null, search = this.options.liveSearch ? document.createElement("div") : null, actions = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null, doneButton = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                if (text.className = "text", newElement.className = this.$menu[0].parentNode.className + " open", 
                menu.className = "dropdown-menu open", menuInner.className = "dropdown-menu inner", 
                divider.className = "divider", text.appendChild(document.createTextNode("Inner text")), 
                a.appendChild(text), li.appendChild(a), menuInner.appendChild(li), menuInner.appendChild(divider), 
                header && menu.appendChild(header), search) {
                    var input = document.createElement("input");
                    search.className = "bs-searchbox", input.className = "form-control", search.appendChild(input), 
                    menu.appendChild(search);
                }
                actions && menu.appendChild(actions), menu.appendChild(menuInner), doneButton && menu.appendChild(doneButton), 
                newElement.appendChild(menu), document.body.appendChild(newElement);
                var liHeight = a.offsetHeight, headerHeight = header ? header.offsetHeight : 0, searchHeight = search ? search.offsetHeight : 0, actionsHeight = actions ? actions.offsetHeight : 0, doneButtonHeight = doneButton ? doneButton.offsetHeight : 0, dividerHeight = $(divider).outerHeight(!0), menuStyle = "function" == typeof getComputedStyle && getComputedStyle(menu), $menu = menuStyle ? null : $(menu), menuPadding = {
                    vert: parseInt(menuStyle ? menuStyle.paddingTop : $menu.css("paddingTop")) + parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css("paddingBottom")) + parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css("borderTopWidth")) + parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css("borderBottomWidth")),
                    horiz: parseInt(menuStyle ? menuStyle.paddingLeft : $menu.css("paddingLeft")) + parseInt(menuStyle ? menuStyle.paddingRight : $menu.css("paddingRight")) + parseInt(menuStyle ? menuStyle.borderLeftWidth : $menu.css("borderLeftWidth")) + parseInt(menuStyle ? menuStyle.borderRightWidth : $menu.css("borderRightWidth"))
                }, menuExtras = {
                    vert: menuPadding.vert + parseInt(menuStyle ? menuStyle.marginTop : $menu.css("marginTop")) + parseInt(menuStyle ? menuStyle.marginBottom : $menu.css("marginBottom")) + 2,
                    horiz: menuPadding.horiz + parseInt(menuStyle ? menuStyle.marginLeft : $menu.css("marginLeft")) + parseInt(menuStyle ? menuStyle.marginRight : $menu.css("marginRight")) + 2
                };
                document.body.removeChild(newElement), this.sizeInfo = {
                    liHeight: liHeight,
                    headerHeight: headerHeight,
                    searchHeight: searchHeight,
                    actionsHeight: actionsHeight,
                    doneButtonHeight: doneButtonHeight,
                    dividerHeight: dividerHeight,
                    menuPadding: menuPadding,
                    menuExtras: menuExtras
                };
            }
        },
        setSize: function() {
            if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), 
            this.options.size !== !1) {
                var menuHeight, menuWidth, getHeight, getWidth, selectOffsetTop, selectOffsetBot, selectOffsetLeft, selectOffsetRight, that = this, $menu = this.$menu, $menuInner = this.$menuInner, $window = $(window), selectHeight = this.$newElement[0].offsetHeight, selectWidth = this.$newElement[0].offsetWidth, liHeight = this.sizeInfo.liHeight, headerHeight = this.sizeInfo.headerHeight, searchHeight = this.sizeInfo.searchHeight, actionsHeight = this.sizeInfo.actionsHeight, doneButtonHeight = this.sizeInfo.doneButtonHeight, divHeight = this.sizeInfo.dividerHeight, menuPadding = this.sizeInfo.menuPadding, menuExtras = this.sizeInfo.menuExtras, notDisabled = this.options.hideDisabled ? ".disabled" : "", getPos = function() {
                    var containerPos, pos = that.$newElement.offset(), $container = $(that.options.container);
                    that.options.container && !$container.is("body") ? (containerPos = $container.offset(), 
                    containerPos.top += parseInt($container.css("borderTopWidth")), containerPos.left += parseInt($container.css("borderLeftWidth"))) : containerPos = {
                        top: 0,
                        left: 0
                    };
                    var winPad = that.options.windowPadding;
                    selectOffsetTop = pos.top - containerPos.top - $window.scrollTop(), selectOffsetBot = $window.height() - selectOffsetTop - selectHeight - containerPos.top - winPad[2], 
                    selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft(), selectOffsetRight = $window.width() - selectOffsetLeft - selectWidth - containerPos.left - winPad[1], 
                    selectOffsetTop -= winPad[0], selectOffsetLeft -= winPad[3];
                };
                if (getPos(), "auto" === this.options.size) {
                    var getSize = function() {
                        var minHeight, hasClass = function(className, include) {
                            return function(element) {
                                return include ? element.classList ? element.classList.contains(className) : $(element).hasClass(className) : !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                            };
                        }, lis = that.$menuInner[0].getElementsByTagName("li"), lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass("hidden", !1)) : that.$lis.not(".hidden"), optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass("dropdown-header", !0)) : lisVisible.filter(".dropdown-header");
                        getPos(), menuHeight = selectOffsetBot - menuExtras.vert, menuWidth = selectOffsetRight - menuExtras.horiz, 
                        that.options.container ? ($menu.data("height") || $menu.data("height", $menu.height()), 
                        getHeight = $menu.data("height"), $menu.data("width") || $menu.data("width", $menu.width()), 
                        getWidth = $menu.data("width")) : (getHeight = $menu.height(), getWidth = $menu.width()), 
                        that.options.dropupAuto && that.$newElement.toggleClass("dropup", selectOffsetTop > selectOffsetBot && menuHeight - menuExtras.vert < getHeight), 
                        that.$newElement.hasClass("dropup") && (menuHeight = selectOffsetTop - menuExtras.vert), 
                        "auto" === that.options.dropdownAlignRight && $menu.toggleClass("dropdown-menu-right", selectOffsetLeft > selectOffsetRight && menuWidth - menuExtras.horiz < getWidth - selectWidth), 
                        minHeight = lisVisible.length + optGroup.length > 3 ? 3 * liHeight + menuExtras.vert - 2 : 0, 
                        $menu.css({
                            "max-height": menuHeight + "px",
                            overflow: "hidden",
                            "min-height": minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + "px"
                        }), $menuInner.css({
                            "max-height": menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert + "px",
                            "overflow-y": "auto",
                            "min-height": Math.max(minHeight - menuPadding.vert, 0) + "px"
                        });
                    };
                    getSize(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", getSize), 
                    $window.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", getSize);
                } else if (this.options.size && "auto" != this.options.size && this.$lis.not(notDisabled).length > this.options.size) {
                    var optIndex = this.$lis.not(".divider").not(notDisabled).children().slice(0, this.options.size).last().parent().index(), divLength = this.$lis.slice(0, optIndex + 1).filter(".divider").length;
                    menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert, 
                    that.options.container ? ($menu.data("height") || $menu.data("height", $menu.height()), 
                    getHeight = $menu.data("height")) : getHeight = $menu.height(), that.options.dropupAuto && this.$newElement.toggleClass("dropup", selectOffsetTop > selectOffsetBot && menuHeight - menuExtras.vert < getHeight), 
                    $menu.css({
                        "max-height": menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + "px",
                        overflow: "hidden",
                        "min-height": ""
                    }), $menuInner.css({
                        "max-height": menuHeight - menuPadding.vert + "px",
                        "overflow-y": "auto",
                        "min-height": ""
                    });
                }
            }
        },
        setWidth: function() {
            if ("auto" === this.options.width) {
                this.$menu.css("min-width", "0");
                var $selectClone = this.$menu.parent().clone().appendTo("body"), $selectClone2 = this.options.container ? this.$newElement.clone().appendTo("body") : $selectClone, ulWidth = $selectClone.children(".dropdown-menu").outerWidth(), btnWidth = $selectClone2.css("width", "auto").children("button").outerWidth();
                $selectClone.remove(), $selectClone2.remove(), this.$newElement.css("width", Math.max(ulWidth, btnWidth) + "px");
            } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), 
            this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), 
            this.$newElement.css("width", ""));
            this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width");
        },
        selectPosition: function() {
            this.$bsContainer = $('<div class="bs-container" />');
            var pos, containerPos, actualHeight, that = this, $container = $(this.options.container), getPlacement = function($element) {
                that.$bsContainer.addClass($element.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", $element.hasClass("dropup")), 
                pos = $element.offset(), $container.is("body") ? containerPos = {
                    top: 0,
                    left: 0
                } : (containerPos = $container.offset(), containerPos.top += parseInt($container.css("borderTopWidth")) - $container.scrollTop(), 
                containerPos.left += parseInt($container.css("borderLeftWidth")) - $container.scrollLeft()), 
                actualHeight = $element.hasClass("dropup") ? 0 : $element[0].offsetHeight, that.$bsContainer.css({
                    top: pos.top - containerPos.top + actualHeight,
                    left: pos.left - containerPos.left,
                    width: $element[0].offsetWidth
                });
            };
            this.$button.on("click", function() {
                var $this = $(this);
                that.isDisabled() || (getPlacement(that.$newElement), that.$bsContainer.appendTo(that.options.container).toggleClass("open", !$this.hasClass("open")).append(that.$menu));
            }), $(window).on("resize scroll", function() {
                getPlacement(that.$newElement);
            }), this.$element.on("hide.bs.select", function() {
                that.$menu.data("height", that.$menu.height()), that.$bsContainer.detach();
            });
        },
        setSelected: function(index, selected, $lis) {
            $lis || (this.togglePlaceholder(), $lis = this.findLis().eq(this.liObj[index])), 
            $lis.toggleClass("selected", selected).find("a").attr("aria-selected", selected);
        },
        setDisabled: function(index, disabled, $lis) {
            $lis || ($lis = this.findLis().eq(this.liObj[index])), disabled ? $lis.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : $lis.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1);
        },
        isDisabled: function() {
            return this.$element[0].disabled;
        },
        checkDisabled: function() {
            var that = this;
            this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1).attr("aria-disabled", !0)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), 
            this.$button.removeClass("disabled").attr("aria-disabled", !1)), this.$button.attr("tabindex") != -1 || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), 
            this.$button.click(function() {
                return !that.isDisabled();
            });
        },
        togglePlaceholder: function() {
            var value = this.$element.val();
            this.$button.toggleClass("bs-placeholder", null === value || "" === value || value.constructor === Array && 0 === value.length);
        },
        tabIndex: function() {
            this.$element.data("tabindex") !== this.$element.attr("tabindex") && this.$element.attr("tabindex") !== -98 && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), 
            this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98);
        },
        clickListener: function() {
            var that = this, $document = $(document);
            $document.data("spaceSelect", !1), this.$button.on("keyup", function(e) {
                /(32)/.test(e.keyCode.toString(10)) && $document.data("spaceSelect") && (e.preventDefault(), 
                $document.data("spaceSelect", !1));
            }), this.$button.on("click", function() {
                that.setSize();
            }), this.$element.on("shown.bs.select", function() {
                if (that.options.liveSearch || that.multiple) {
                    if (!that.multiple) {
                        var selectedIndex = that.liObj[that.$element[0].selectedIndex];
                        if ("number" != typeof selectedIndex || that.options.size === !1) return;
                        var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
                        offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2, 
                        that.$menuInner[0].scrollTop = offset;
                    }
                } else that.$menuInner.find(".selected a").focus();
            }), this.$menuInner.on("click", "li a", function(e) {
                var $this = $(this), clickedIndex = $this.parent().data("originalIndex"), prevValue = that.$element.val(), prevIndex = that.$element.prop("selectedIndex"), triggerChange = !0;
                if (that.multiple && 1 !== that.options.maxOptions && e.stopPropagation(), e.preventDefault(), 
                !that.isDisabled() && !$this.parent().hasClass("disabled")) {
                    var $options = that.$element.find("option"), $option = $options.eq(clickedIndex), state = $option.prop("selected"), $optgroup = $option.parent("optgroup"), maxOptions = that.options.maxOptions, maxOptionsGrp = $optgroup.data("maxOptions") || !1;
                    if (that.multiple) {
                        if ($option.prop("selected", !state), that.setSelected(clickedIndex, !state), $this.blur(), 
                        maxOptions !== !1 || maxOptionsGrp !== !1) {
                            var maxReached = maxOptions < $options.filter(":selected").length, maxReachedGrp = maxOptionsGrp < $optgroup.find("option:selected").length;
                            if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp) if (maxOptions && 1 == maxOptions) $options.prop("selected", !1), 
                            $option.prop("selected", !0), that.$menuInner.find(".selected").removeClass("selected"), 
                            that.setSelected(clickedIndex, !0); else if (maxOptionsGrp && 1 == maxOptionsGrp) {
                                $optgroup.find("option:selected").prop("selected", !1), $option.prop("selected", !0);
                                var optgroupID = $this.parent().data("optgroup");
                                that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass("selected"), 
                                that.setSelected(clickedIndex, !0);
                            } else {
                                var maxOptionsText = "string" == typeof that.options.maxOptionsText ? [ that.options.maxOptionsText, that.options.maxOptionsText ] : that.options.maxOptionsText, maxOptionsArr = "function" == typeof maxOptionsText ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText, maxTxt = maxOptionsArr[0].replace("{n}", maxOptions), maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp), $notify = $('<div class="notify"></div>');
                                maxOptionsArr[2] && (maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][maxOptions > 1 ? 0 : 1]), 
                                maxTxtGrp = maxTxtGrp.replace("{var}", maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1])), 
                                $option.prop("selected", !1), that.$menu.append($notify), maxOptions && maxReached && ($notify.append($("<div>" + maxTxt + "</div>")), 
                                triggerChange = !1, that.$element.trigger("maxReached.bs.select")), maxOptionsGrp && maxReachedGrp && ($notify.append($("<div>" + maxTxtGrp + "</div>")), 
                                triggerChange = !1, that.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                    that.setSelected(clickedIndex, !1);
                                }, 10), $notify.delay(750).fadeOut(300, function() {
                                    $(this).remove();
                                });
                            }
                        }
                    } else $options.prop("selected", !1), $option.prop("selected", !0), that.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1), 
                    that.setSelected(clickedIndex, !0);
                    !that.multiple || that.multiple && 1 === that.options.maxOptions ? that.$button.focus() : that.options.liveSearch && that.$searchbox.focus(), 
                    triggerChange && (prevValue != that.$element.val() && that.multiple || prevIndex != that.$element.prop("selectedIndex") && !that.multiple) && (changed_arguments = [ clickedIndex, $option.prop("selected"), state ], 
                    that.$element.triggerNative("change"));
                }
            }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(e) {
                e.currentTarget == this && (e.preventDefault(), e.stopPropagation(), that.options.liveSearch && !$(e.target).hasClass("close") ? that.$searchbox.focus() : that.$button.focus());
            }), this.$menuInner.on("click", ".divider, .dropdown-header", function(e) {
                e.preventDefault(), e.stopPropagation(), that.options.liveSearch ? that.$searchbox.focus() : that.$button.focus();
            }), this.$menu.on("click", ".popover-title .close", function() {
                that.$button.click();
            }), this.$searchbox.on("click", function(e) {
                e.stopPropagation();
            }), this.$menu.on("click", ".actions-btn", function(e) {
                that.options.liveSearch ? that.$searchbox.focus() : that.$button.focus(), e.preventDefault(), 
                e.stopPropagation(), $(this).hasClass("bs-select-all") ? that.selectAll() : that.deselectAll();
            }), this.$element.change(function() {
                that.render(!1), that.$element.trigger("changed.bs.select", changed_arguments), 
                changed_arguments = null;
            });
        },
        liveSearchListener: function() {
            var that = this, $no_results = $('<li class="no-results"></li>');
            this.$button.on("click.dropdown.data-api", function() {
                that.$menuInner.find(".active").removeClass("active"), that.$searchbox.val() && (that.$searchbox.val(""), 
                that.$lis.not(".is-hidden").removeClass("hidden"), $no_results.parent().length && $no_results.remove()), 
                that.multiple || that.$menuInner.find(".selected").addClass("active"), setTimeout(function() {
                    that.$searchbox.focus();
                }, 10);
            }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(e) {
                e.stopPropagation();
            }), this.$searchbox.on("input propertychange", function() {
                if (that.$lis.not(".is-hidden").removeClass("hidden"), that.$lis.filter(".active").removeClass("active"), 
                $no_results.remove(), that.$searchbox.val()) {
                    var $hideItems, $searchBase = that.$lis.not(".is-hidden, .divider, .dropdown-header");
                    if ($hideItems = that.options.liveSearchNormalize ? $searchBase.not(":a" + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")') : $searchBase.not(":" + that._searchStyle() + '("' + that.$searchbox.val() + '")'), 
                    $hideItems.length === $searchBase.length) $no_results.html(that.options.noneResultsText.replace("{0}", '"' + htmlEscape(that.$searchbox.val()) + '"')), 
                    that.$menuInner.append($no_results), that.$lis.addClass("hidden"); else {
                        $hideItems.addClass("hidden");
                        var $foundDiv, $lisVisible = that.$lis.not(".hidden");
                        $lisVisible.each(function(index) {
                            var $this = $(this);
                            $this.hasClass("divider") ? void 0 === $foundDiv ? $this.addClass("hidden") : ($foundDiv && $foundDiv.addClass("hidden"), 
                            $foundDiv = $this) : $this.hasClass("dropdown-header") && $lisVisible.eq(index + 1).data("optgroup") !== $this.data("optgroup") ? $this.addClass("hidden") : $foundDiv = null;
                        }), $foundDiv && $foundDiv.addClass("hidden"), $searchBase.not(".hidden").first().addClass("active"), 
                        that.$menuInner.scrollTop(0);
                    }
                }
            });
        },
        _searchStyle: function() {
            var styles = {
                begins: "ibegins",
                startsWith: "ibegins"
            };
            return styles[this.options.liveSearchStyle] || "icontains";
        },
        val: function(value) {
            return "undefined" != typeof value ? (this.$element.val(value), this.render(), this.$element) : this.$element.val();
        },
        changeAll: function(status) {
            if (this.multiple) {
                "undefined" == typeof status && (status = !0), this.findLis();
                var $options = this.$element.find("option"), $lisVisible = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"), lisVisLen = $lisVisible.length, selectedOptions = [];
                if (status) {
                    if ($lisVisible.filter(".selected").length === $lisVisible.length) return;
                } else if (0 === $lisVisible.filter(".selected").length) return;
                $lisVisible.toggleClass("selected", status);
                for (var i = 0; i < lisVisLen; i++) {
                    var origIndex = $lisVisible[i].getAttribute("data-original-index");
                    selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
                }
                $(selectedOptions).prop("selected", status), this.render(!1), this.togglePlaceholder(), 
                this.$element.triggerNative("change");
            }
        },
        selectAll: function() {
            return this.changeAll(!0);
        },
        deselectAll: function() {
            return this.changeAll(!1);
        },
        toggle: function(e) {
            e = e || window.event, e && e.stopPropagation(), this.$button.trigger("click");
        },
        keydown: function(e) {
            var $items, index, prevIndex, isActive, $this = $(this), $parent = $this.is("input") ? $this.parent().parent() : $this.parent(), that = $parent.data("this"), selector = ":not(.disabled, .hidden, .dropdown-header, .divider)", keyCodeMap = {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            };
            if (isActive = that.$newElement.hasClass("open"), !isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) return that.options.container ? that.$button.trigger("click") : (that.setSize(), 
            that.$menu.parent().addClass("open"), isActive = !0), void that.$searchbox.focus();
            if (that.options.liveSearch && /(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (e.preventDefault(), 
            e.stopPropagation(), that.$menuInner.click(), that.$button.focus()), /(38|40)/.test(e.keyCode.toString(10))) {
                if ($items = that.$lis.filter(selector), !$items.length) return;
                index = that.options.liveSearch ? $items.index($items.filter(".active")) : $items.index($items.find("a").filter(":focus").parent()), 
                prevIndex = that.$menuInner.data("prevIndex"), 38 == e.keyCode ? (!that.options.liveSearch && index != prevIndex || index == -1 || index--, 
                index < 0 && (index += $items.length)) : 40 == e.keyCode && ((that.options.liveSearch || index == prevIndex) && index++, 
                index %= $items.length), that.$menuInner.data("prevIndex", index), that.options.liveSearch ? (e.preventDefault(), 
                $this.hasClass("dropdown-toggle") || ($items.removeClass("active").eq(index).addClass("active").children("a").focus(), 
                $this.focus())) : $items.eq(index).children("a").focus();
            } else if (!$this.is("input")) {
                var count, prevKey, keyIndex = [];
                $items = that.$lis.filter(selector), $items.each(function(i) {
                    $.trim($(this).children("a").text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode] && keyIndex.push(i);
                }), count = $(document).data("keycount"), count++, $(document).data("keycount", count), 
                prevKey = $.trim($(":focus").text().toLowerCase()).substring(0, 1), prevKey != keyCodeMap[e.keyCode] ? (count = 1, 
                $(document).data("keycount", count)) : count >= keyIndex.length && ($(document).data("keycount", 0), 
                count > keyIndex.length && (count = 1)), $items.eq(keyIndex[count - 1]).children("a").focus();
            }
            if ((/(13|32)/.test(e.keyCode.toString(10)) || /(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab) && isActive) {
                if (/(32)/.test(e.keyCode.toString(10)) || e.preventDefault(), that.options.liveSearch) /(32)/.test(e.keyCode.toString(10)) || (that.$menuInner.find(".active a").click(), 
                $this.focus()); else {
                    var elem = $(":focus");
                    elem.click(), elem.focus(), e.preventDefault(), $(document).data("spaceSelect", !0);
                }
                $(document).data("keycount", 0);
            }
            (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch) || /(27)/.test(e.keyCode.toString(10)) && !isActive) && (that.$menu.parent().removeClass("open"), 
            that.options.container && that.$newElement.removeClass("open"), that.$button.focus());
        },
        mobile: function() {
            this.$element.addClass("mobile-device");
        },
        refresh: function() {
            this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), 
            this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), 
            this.$element.trigger("refreshed.bs.select");
        },
        hide: function() {
            this.$newElement.hide();
        },
        show: function() {
            this.$newElement.show();
        },
        remove: function() {
            this.$newElement.remove(), this.$element.remove();
        },
        destroy: function() {
            this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), 
            this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker");
        }
    };
    var old = $.fn.selectpicker;
    $.fn.selectpicker = Plugin, $.fn.selectpicker.Constructor = Selectpicker, $.fn.selectpicker.noConflict = function() {
        return $.fn.selectpicker = old, this;
    }, $(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', Selectpicker.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function(e) {
        e.stopPropagation();
    }), $(window).on("load.bs.select.data-api", function() {
        $(".selectpicker").each(function() {
            var $selectpicker = $(this);
            Plugin.call($selectpicker, $selectpicker.data());
        });
    });
}(jQuery), function(factory) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], function($) {
        return factory($, window, document);
    }) : "object" == typeof exports ? module.exports = function(root, $) {
        return root || (root = window), $ || ($ = "undefined" != typeof window ? require("jquery") : require("jquery")(root)), 
        factory($, root, root.document);
    } : factory(jQuery, window, document);
}(function($, window, document, undefined) {
    "use strict";
    function _fnHungarianMap(o) {
        var match, newKey, hungarian = "a aa ai ao as b fn i m o s ", map = {};
        $.each(o, function(key, val) {
            match = key.match(/^([^A-Z]+?)([A-Z])/), match && hungarian.indexOf(match[1] + " ") !== -1 && (newKey = key.replace(match[0], match[2].toLowerCase()), 
            map[newKey] = key, "o" === match[1] && _fnHungarianMap(o[key]));
        }), o._hungarianMap = map;
    }
    function _fnCamelToHungarian(src, user, force) {
        src._hungarianMap || _fnHungarianMap(src);
        var hungarianKey;
        $.each(user, function(key, val) {
            hungarianKey = src._hungarianMap[key], hungarianKey === undefined || !force && user[hungarianKey] !== undefined || ("o" === hungarianKey.charAt(0) ? (user[hungarianKey] || (user[hungarianKey] = {}), 
            $.extend(!0, user[hungarianKey], user[key]), _fnCamelToHungarian(src[hungarianKey], user[hungarianKey], force)) : user[hungarianKey] = user[key]);
        });
    }
    function _fnLanguageCompat(lang) {
        var defaults = DataTable.defaults.oLanguage, zeroRecords = lang.sZeroRecords;
        !lang.sEmptyTable && zeroRecords && "No data available in table" === defaults.sEmptyTable && _fnMap(lang, lang, "sZeroRecords", "sEmptyTable"), 
        !lang.sLoadingRecords && zeroRecords && "Loading..." === defaults.sLoadingRecords && _fnMap(lang, lang, "sZeroRecords", "sLoadingRecords"), 
        lang.sInfoThousands && (lang.sThousands = lang.sInfoThousands);
        var decimal = lang.sDecimal;
        decimal && _addNumericSort(decimal);
    }
    function _fnCompatOpts(init) {
        _fnCompatMap(init, "ordering", "bSort"), _fnCompatMap(init, "orderMulti", "bSortMulti"), 
        _fnCompatMap(init, "orderClasses", "bSortClasses"), _fnCompatMap(init, "orderCellsTop", "bSortCellsTop"), 
        _fnCompatMap(init, "order", "aaSorting"), _fnCompatMap(init, "orderFixed", "aaSortingFixed"), 
        _fnCompatMap(init, "paging", "bPaginate"), _fnCompatMap(init, "pagingType", "sPaginationType"), 
        _fnCompatMap(init, "pageLength", "iDisplayLength"), _fnCompatMap(init, "searching", "bFilter"), 
        "boolean" == typeof init.sScrollX && (init.sScrollX = init.sScrollX ? "100%" : ""), 
        "boolean" == typeof init.scrollX && (init.scrollX = init.scrollX ? "100%" : "");
        var searchCols = init.aoSearchCols;
        if (searchCols) for (var i = 0, ien = searchCols.length; i < ien; i++) searchCols[i] && _fnCamelToHungarian(DataTable.models.oSearch, searchCols[i]);
    }
    function _fnCompatCols(init) {
        _fnCompatMap(init, "orderable", "bSortable"), _fnCompatMap(init, "orderData", "aDataSort"), 
        _fnCompatMap(init, "orderSequence", "asSorting"), _fnCompatMap(init, "orderDataType", "sortDataType");
        var dataSort = init.aDataSort;
        dataSort && !$.isArray(dataSort) && (init.aDataSort = [ dataSort ]);
    }
    function _fnBrowserDetect(settings) {
        if (!DataTable.__browser) {
            var browser = {};
            DataTable.__browser = browser;
            var n = $("<div/>").css({
                position: "fixed",
                top: 0,
                left: 0,
                height: 1,
                width: 1,
                overflow: "hidden"
            }).append($("<div/>").css({
                position: "absolute",
                top: 1,
                left: 1,
                width: 100,
                overflow: "scroll"
            }).append($("<div/>").css({
                width: "100%",
                height: 10
            }))).appendTo("body"), outer = n.children(), inner = outer.children();
            browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth, browser.bScrollOversize = 100 === inner[0].offsetWidth && 100 !== outer[0].clientWidth, 
            browser.bScrollbarLeft = 1 !== Math.round(inner.offset().left), browser.bBounding = !!n[0].getBoundingClientRect().width, 
            n.remove();
        }
        $.extend(settings.oBrowser, DataTable.__browser), settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
    }
    function _fnReduce(that, fn, init, start, end, inc) {
        var value, i = start, isSet = !1;
        for (init !== undefined && (value = init, isSet = !0); i !== end; ) that.hasOwnProperty(i) && (value = isSet ? fn(value, that[i], i, that) : that[i], 
        isSet = !0, i += inc);
        return value;
    }
    function _fnAddColumn(oSettings, nTh) {
        var oDefaults = DataTable.defaults.column, iCol = oSettings.aoColumns.length, oCol = $.extend({}, DataTable.models.oColumn, oDefaults, {
            nTh: nTh ? nTh : document.createElement("th"),
            sTitle: oDefaults.sTitle ? oDefaults.sTitle : nTh ? nTh.innerHTML : "",
            aDataSort: oDefaults.aDataSort ? oDefaults.aDataSort : [ iCol ],
            mData: oDefaults.mData ? oDefaults.mData : iCol,
            idx: iCol
        });
        oSettings.aoColumns.push(oCol);
        var searchCols = oSettings.aoPreSearchCols;
        searchCols[iCol] = $.extend({}, DataTable.models.oSearch, searchCols[iCol]), _fnColumnOptions(oSettings, iCol, $(nTh).data());
    }
    function _fnColumnOptions(oSettings, iCol, oOptions) {
        var oCol = oSettings.aoColumns[iCol], oClasses = oSettings.oClasses, th = $(oCol.nTh);
        if (!oCol.sWidthOrig) {
            oCol.sWidthOrig = th.attr("width") || null;
            var t = (th.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            t && (oCol.sWidthOrig = t[1]);
        }
        oOptions !== undefined && null !== oOptions && (_fnCompatCols(oOptions), _fnCamelToHungarian(DataTable.defaults.column, oOptions), 
        oOptions.mDataProp === undefined || oOptions.mData || (oOptions.mData = oOptions.mDataProp), 
        oOptions.sType && (oCol._sManualType = oOptions.sType), oOptions.className && !oOptions.sClass && (oOptions.sClass = oOptions.className), 
        $.extend(oCol, oOptions), _fnMap(oCol, oOptions, "sWidth", "sWidthOrig"), oOptions.iDataSort !== undefined && (oCol.aDataSort = [ oOptions.iDataSort ]), 
        _fnMap(oCol, oOptions, "aDataSort"));
        var mDataSrc = oCol.mData, mData = _fnGetObjectDataFn(mDataSrc), mRender = oCol.mRender ? _fnGetObjectDataFn(oCol.mRender) : null, attrTest = function(src) {
            return "string" == typeof src && src.indexOf("@") !== -1;
        };
        oCol._bAttrSrc = $.isPlainObject(mDataSrc) && (attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)), 
        oCol._setter = null, oCol.fnGetData = function(rowData, type, meta) {
            var innerData = mData(rowData, type, undefined, meta);
            return mRender && type ? mRender(innerData, type, rowData, meta) : innerData;
        }, oCol.fnSetData = function(rowData, val, meta) {
            return _fnSetObjectDataFn(mDataSrc)(rowData, val, meta);
        }, "number" != typeof mDataSrc && (oSettings._rowReadObject = !0), oSettings.oFeatures.bSort || (oCol.bSortable = !1, 
        th.addClass(oClasses.sSortableNone));
        var bAsc = $.inArray("asc", oCol.asSorting) !== -1, bDesc = $.inArray("desc", oCol.asSorting) !== -1;
        oCol.bSortable && (bAsc || bDesc) ? bAsc && !bDesc ? (oCol.sSortingClass = oClasses.sSortableAsc, 
        oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed) : !bAsc && bDesc ? (oCol.sSortingClass = oClasses.sSortableDesc, 
        oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed) : (oCol.sSortingClass = oClasses.sSortable, 
        oCol.sSortingClassJUI = oClasses.sSortJUI) : (oCol.sSortingClass = oClasses.sSortableNone, 
        oCol.sSortingClassJUI = "");
    }
    function _fnAdjustColumnSizing(settings) {
        if (settings.oFeatures.bAutoWidth !== !1) {
            var columns = settings.aoColumns;
            _fnCalculateColumnWidths(settings);
            for (var i = 0, iLen = columns.length; i < iLen; i++) columns[i].nTh.style.width = columns[i].sWidth;
        }
        var scroll = settings.oScroll;
        "" === scroll.sY && "" === scroll.sX || _fnScrollDraw(settings), _fnCallbackFire(settings, null, "column-sizing", [ settings ]);
    }
    function _fnVisibleToColumnIndex(oSettings, iMatch) {
        var aiVis = _fnGetColumns(oSettings, "bVisible");
        return "number" == typeof aiVis[iMatch] ? aiVis[iMatch] : null;
    }
    function _fnColumnIndexToVisible(oSettings, iMatch) {
        var aiVis = _fnGetColumns(oSettings, "bVisible"), iPos = $.inArray(iMatch, aiVis);
        return iPos !== -1 ? iPos : null;
    }
    function _fnVisbleColumns(oSettings) {
        var vis = 0;
        return $.each(oSettings.aoColumns, function(i, col) {
            col.bVisible && "none" !== $(col.nTh).css("display") && vis++;
        }), vis;
    }
    function _fnGetColumns(oSettings, sParam) {
        var a = [];
        return $.map(oSettings.aoColumns, function(val, i) {
            val[sParam] && a.push(i);
        }), a;
    }
    function _fnColumnTypes(settings) {
        var i, ien, j, jen, k, ken, col, detectedType, cache, columns = settings.aoColumns, data = settings.aoData, types = DataTable.ext.type.detect;
        for (i = 0, ien = columns.length; i < ien; i++) if (col = columns[i], cache = [], 
        !col.sType && col._sManualType) col.sType = col._sManualType; else if (!col.sType) {
            for (j = 0, jen = types.length; j < jen; j++) {
                for (k = 0, ken = data.length; k < ken && (cache[k] === undefined && (cache[k] = _fnGetCellData(settings, k, i, "type")), 
                detectedType = types[j](cache[k], settings), detectedType || j === types.length - 1) && "html" !== detectedType; k++) ;
                if (detectedType) {
                    col.sType = detectedType;
                    break;
                }
            }
            col.sType || (col.sType = "string");
        }
    }
    function _fnApplyColumnDefs(oSettings, aoColDefs, aoCols, fn) {
        var i, iLen, j, jLen, k, kLen, def, columns = oSettings.aoColumns;
        if (aoColDefs) for (i = aoColDefs.length - 1; i >= 0; i--) {
            def = aoColDefs[i];
            var aTargets = def.targets !== undefined ? def.targets : def.aTargets;
            for ($.isArray(aTargets) || (aTargets = [ aTargets ]), j = 0, jLen = aTargets.length; j < jLen; j++) if ("number" == typeof aTargets[j] && aTargets[j] >= 0) {
                for (;columns.length <= aTargets[j]; ) _fnAddColumn(oSettings);
                fn(aTargets[j], def);
            } else if ("number" == typeof aTargets[j] && aTargets[j] < 0) fn(columns.length + aTargets[j], def); else if ("string" == typeof aTargets[j]) for (k = 0, 
            kLen = columns.length; k < kLen; k++) ("_all" == aTargets[j] || $(columns[k].nTh).hasClass(aTargets[j])) && fn(k, def);
        }
        if (aoCols) for (i = 0, iLen = aoCols.length; i < iLen; i++) fn(i, aoCols[i]);
    }
    function _fnAddData(oSettings, aDataIn, nTr, anTds) {
        var iRow = oSettings.aoData.length, oData = $.extend(!0, {}, DataTable.models.oRow, {
            src: nTr ? "dom" : "data",
            idx: iRow
        });
        oData._aData = aDataIn, oSettings.aoData.push(oData);
        for (var columns = oSettings.aoColumns, i = 0, iLen = columns.length; i < iLen; i++) columns[i].sType = null;
        oSettings.aiDisplayMaster.push(iRow);
        var id = oSettings.rowIdFn(aDataIn);
        return id !== undefined && (oSettings.aIds[id] = oData), !nTr && oSettings.oFeatures.bDeferRender || _fnCreateTr(oSettings, iRow, nTr, anTds), 
        iRow;
    }
    function _fnAddTr(settings, trs) {
        var row;
        return trs instanceof $ || (trs = $(trs)), trs.map(function(i, el) {
            return row = _fnGetRowElements(settings, el), _fnAddData(settings, row.data, el, row.cells);
        });
    }
    function _fnNodeToDataIndex(oSettings, n) {
        return n._DT_RowIndex !== undefined ? n._DT_RowIndex : null;
    }
    function _fnNodeToColumnIndex(oSettings, iRow, n) {
        return $.inArray(n, oSettings.aoData[iRow].anCells);
    }
    function _fnGetCellData(settings, rowIdx, colIdx, type) {
        var draw = settings.iDraw, col = settings.aoColumns[colIdx], rowData = settings.aoData[rowIdx]._aData, defaultContent = col.sDefaultContent, cellData = col.fnGetData(rowData, type, {
            settings: settings,
            row: rowIdx,
            col: colIdx
        });
        if (cellData === undefined) return settings.iDrawError != draw && null === defaultContent && (_fnLog(settings, 0, "Requested unknown parameter " + ("function" == typeof col.mData ? "{function}" : "'" + col.mData + "'") + " for row " + rowIdx + ", column " + colIdx, 4), 
        settings.iDrawError = draw), defaultContent;
        if (cellData !== rowData && null !== cellData || null === defaultContent || type === undefined) {
            if ("function" == typeof cellData) return cellData.call(rowData);
        } else cellData = defaultContent;
        return null === cellData && "display" == type ? "" : cellData;
    }
    function _fnSetCellData(settings, rowIdx, colIdx, val) {
        var col = settings.aoColumns[colIdx], rowData = settings.aoData[rowIdx]._aData;
        col.fnSetData(rowData, val, {
            settings: settings,
            row: rowIdx,
            col: colIdx
        });
    }
    function _fnSplitObjNotation(str) {
        return $.map(str.match(/(\\.|[^\.])+/g) || [ "" ], function(s) {
            return s.replace(/\\./g, ".");
        });
    }
    function _fnGetObjectDataFn(mSource) {
        if ($.isPlainObject(mSource)) {
            var o = {};
            return $.each(mSource, function(key, val) {
                val && (o[key] = _fnGetObjectDataFn(val));
            }), function(data, type, row, meta) {
                var t = o[type] || o._;
                return t !== undefined ? t(data, type, row, meta) : data;
            };
        }
        if (null === mSource) return function(data) {
            return data;
        };
        if ("function" == typeof mSource) return function(data, type, row, meta) {
            return mSource(data, type, row, meta);
        };
        if ("string" != typeof mSource || mSource.indexOf(".") === -1 && mSource.indexOf("[") === -1 && mSource.indexOf("(") === -1) return function(data, type) {
            return data[mSource];
        };
        var fetchData = function(data, type, src) {
            var arrayNotation, funcNotation, out, innerSrc;
            if ("" !== src) for (var a = _fnSplitObjNotation(src), i = 0, iLen = a.length; i < iLen; i++) {
                if (arrayNotation = a[i].match(__reArray), funcNotation = a[i].match(__reFn), arrayNotation) {
                    if (a[i] = a[i].replace(__reArray, ""), "" !== a[i] && (data = data[a[i]]), out = [], 
                    a.splice(0, i + 1), innerSrc = a.join("."), $.isArray(data)) for (var j = 0, jLen = data.length; j < jLen; j++) out.push(fetchData(data[j], type, innerSrc));
                    var join = arrayNotation[0].substring(1, arrayNotation[0].length - 1);
                    data = "" === join ? out : out.join(join);
                    break;
                }
                if (funcNotation) a[i] = a[i].replace(__reFn, ""), data = data[a[i]](); else {
                    if (null === data || data[a[i]] === undefined) return undefined;
                    data = data[a[i]];
                }
            }
            return data;
        };
        return function(data, type) {
            return fetchData(data, type, mSource);
        };
    }
    function _fnSetObjectDataFn(mSource) {
        if ($.isPlainObject(mSource)) return _fnSetObjectDataFn(mSource._);
        if (null === mSource) return function() {};
        if ("function" == typeof mSource) return function(data, val, meta) {
            mSource(data, "set", val, meta);
        };
        if ("string" != typeof mSource || mSource.indexOf(".") === -1 && mSource.indexOf("[") === -1 && mSource.indexOf("(") === -1) return function(data, val) {
            data[mSource] = val;
        };
        var setData = function(data, val, src) {
            for (var b, arrayNotation, funcNotation, o, innerSrc, a = _fnSplitObjNotation(src), aLast = a[a.length - 1], i = 0, iLen = a.length - 1; i < iLen; i++) {
                if (arrayNotation = a[i].match(__reArray), funcNotation = a[i].match(__reFn), arrayNotation) {
                    if (a[i] = a[i].replace(__reArray, ""), data[a[i]] = [], b = a.slice(), b.splice(0, i + 1), 
                    innerSrc = b.join("."), $.isArray(val)) for (var j = 0, jLen = val.length; j < jLen; j++) o = {}, 
                    setData(o, val[j], innerSrc), data[a[i]].push(o); else data[a[i]] = val;
                    return;
                }
                funcNotation && (a[i] = a[i].replace(__reFn, ""), data = data[a[i]](val)), null !== data[a[i]] && data[a[i]] !== undefined || (data[a[i]] = {}), 
                data = data[a[i]];
            }
            aLast.match(__reFn) ? data = data[aLast.replace(__reFn, "")](val) : data[aLast.replace(__reArray, "")] = val;
        };
        return function(data, val) {
            return setData(data, val, mSource);
        };
    }
    function _fnGetDataMaster(settings) {
        return _pluck(settings.aoData, "_aData");
    }
    function _fnClearTable(settings) {
        settings.aoData.length = 0, settings.aiDisplayMaster.length = 0, settings.aiDisplay.length = 0, 
        settings.aIds = {};
    }
    function _fnDeleteIndex(a, iTarget, splice) {
        for (var iTargetIndex = -1, i = 0, iLen = a.length; i < iLen; i++) a[i] == iTarget ? iTargetIndex = i : a[i] > iTarget && a[i]--;
        iTargetIndex != -1 && splice === undefined && a.splice(iTargetIndex, 1);
    }
    function _fnInvalidate(settings, rowIdx, src, colIdx) {
        var i, ien, row = settings.aoData[rowIdx], cellWrite = function(cell, col) {
            for (;cell.childNodes.length; ) cell.removeChild(cell.firstChild);
            cell.innerHTML = _fnGetCellData(settings, rowIdx, col, "display");
        };
        if ("dom" !== src && (src && "auto" !== src || "dom" !== row.src)) {
            var cells = row.anCells;
            if (cells) if (colIdx !== undefined) cellWrite(cells[colIdx], colIdx); else for (i = 0, 
            ien = cells.length; i < ien; i++) cellWrite(cells[i], i);
        } else row._aData = _fnGetRowElements(settings, row, colIdx, colIdx === undefined ? undefined : row._aData).data;
        row._aSortData = null, row._aFilterData = null;
        var cols = settings.aoColumns;
        if (colIdx !== undefined) cols[colIdx].sType = null; else {
            for (i = 0, ien = cols.length; i < ien; i++) cols[i].sType = null;
            _fnRowAttributes(settings, row);
        }
    }
    function _fnGetRowElements(settings, row, colIdx, d) {
        var name, col, contents, tds = [], td = row.firstChild, i = 0, columns = settings.aoColumns, objectRead = settings._rowReadObject;
        d = d !== undefined ? d : objectRead ? {} : [];
        var attr = function(str, td) {
            if ("string" == typeof str) {
                var idx = str.indexOf("@");
                if (idx !== -1) {
                    var attr = str.substring(idx + 1), setter = _fnSetObjectDataFn(str);
                    setter(d, td.getAttribute(attr));
                }
            }
        }, cellProcess = function(cell) {
            if (colIdx === undefined || colIdx === i) if (col = columns[i], contents = $.trim(cell.innerHTML), 
            col && col._bAttrSrc) {
                var setter = _fnSetObjectDataFn(col.mData._);
                setter(d, contents), attr(col.mData.sort, cell), attr(col.mData.type, cell), attr(col.mData.filter, cell);
            } else objectRead ? (col._setter || (col._setter = _fnSetObjectDataFn(col.mData)), 
            col._setter(d, contents)) : d[i] = contents;
            i++;
        };
        if (td) for (;td; ) name = td.nodeName.toUpperCase(), "TD" != name && "TH" != name || (cellProcess(td), 
        tds.push(td)), td = td.nextSibling; else {
            tds = row.anCells;
            for (var j = 0, jen = tds.length; j < jen; j++) cellProcess(tds[j]);
        }
        var rowNode = row.firstChild ? row : row.nTr;
        if (rowNode) {
            var id = rowNode.getAttribute("id");
            id && _fnSetObjectDataFn(settings.rowId)(d, id);
        }
        return {
            data: d,
            cells: tds
        };
    }
    function _fnCreateTr(oSettings, iRow, nTrIn, anTds) {
        var nTr, nTd, oCol, i, iLen, row = oSettings.aoData[iRow], rowData = row._aData, cells = [];
        if (null === row.nTr) {
            for (nTr = nTrIn || document.createElement("tr"), row.nTr = nTr, row.anCells = cells, 
            nTr._DT_RowIndex = iRow, _fnRowAttributes(oSettings, row), i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) oCol = oSettings.aoColumns[i], 
            nTd = nTrIn ? anTds[i] : document.createElement(oCol.sCellType), nTd._DT_CellIndex = {
                row: iRow,
                column: i
            }, cells.push(nTd), nTrIn && !oCol.mRender && oCol.mData === i || $.isPlainObject(oCol.mData) && oCol.mData._ === i + ".display" || (nTd.innerHTML = _fnGetCellData(oSettings, iRow, i, "display")), 
            oCol.sClass && (nTd.className += " " + oCol.sClass), oCol.bVisible && !nTrIn ? nTr.appendChild(nTd) : !oCol.bVisible && nTrIn && nTd.parentNode.removeChild(nTd), 
            oCol.fnCreatedCell && oCol.fnCreatedCell.call(oSettings.oInstance, nTd, _fnGetCellData(oSettings, iRow, i), rowData, iRow, i);
            _fnCallbackFire(oSettings, "aoRowCreatedCallback", null, [ nTr, rowData, iRow ]);
        }
        row.nTr.setAttribute("role", "row");
    }
    function _fnRowAttributes(settings, row) {
        var tr = row.nTr, data = row._aData;
        if (tr) {
            var id = settings.rowIdFn(data);
            if (id && (tr.id = id), data.DT_RowClass) {
                var a = data.DT_RowClass.split(" ");
                row.__rowc = row.__rowc ? _unique(row.__rowc.concat(a)) : a, $(tr).removeClass(row.__rowc.join(" ")).addClass(data.DT_RowClass);
            }
            data.DT_RowAttr && $(tr).attr(data.DT_RowAttr), data.DT_RowData && $(tr).data(data.DT_RowData);
        }
    }
    function _fnBuildHead(oSettings) {
        var i, ien, cell, row, column, thead = oSettings.nTHead, tfoot = oSettings.nTFoot, createHeader = 0 === $("th, td", thead).length, classes = oSettings.oClasses, columns = oSettings.aoColumns;
        for (createHeader && (row = $("<tr/>").appendTo(thead)), i = 0, ien = columns.length; i < ien; i++) column = columns[i], 
        cell = $(column.nTh).addClass(column.sClass), createHeader && cell.appendTo(row), 
        oSettings.oFeatures.bSort && (cell.addClass(column.sSortingClass), column.bSortable !== !1 && (cell.attr("tabindex", oSettings.iTabIndex).attr("aria-controls", oSettings.sTableId), 
        _fnSortAttachListener(oSettings, column.nTh, i))), column.sTitle != cell[0].innerHTML && cell.html(column.sTitle), 
        _fnRenderer(oSettings, "header")(oSettings, cell, column, classes);
        if (createHeader && _fnDetectHeader(oSettings.aoHeader, thead), $(thead).find(">tr").attr("role", "row"), 
        $(thead).find(">tr>th, >tr>td").addClass(classes.sHeaderTH), $(tfoot).find(">tr>th, >tr>td").addClass(classes.sFooterTH), 
        null !== tfoot) {
            var cells = oSettings.aoFooter[0];
            for (i = 0, ien = cells.length; i < ien; i++) column = columns[i], column.nTf = cells[i].cell, 
            column.sClass && $(column.nTf).addClass(column.sClass);
        }
    }
    function _fnDrawHead(oSettings, aoSource, bIncludeHidden) {
        var i, iLen, j, jLen, k, n, nLocalTr, iRowspan, iColspan, aoLocal = [], aApplied = [], iColumns = oSettings.aoColumns.length;
        if (aoSource) {
            for (bIncludeHidden === undefined && (bIncludeHidden = !1), i = 0, iLen = aoSource.length; i < iLen; i++) {
                for (aoLocal[i] = aoSource[i].slice(), aoLocal[i].nTr = aoSource[i].nTr, j = iColumns - 1; j >= 0; j--) oSettings.aoColumns[j].bVisible || bIncludeHidden || aoLocal[i].splice(j, 1);
                aApplied.push([]);
            }
            for (i = 0, iLen = aoLocal.length; i < iLen; i++) {
                if (nLocalTr = aoLocal[i].nTr) for (;n = nLocalTr.firstChild; ) nLocalTr.removeChild(n);
                for (j = 0, jLen = aoLocal[i].length; j < jLen; j++) if (iRowspan = 1, iColspan = 1, 
                aApplied[i][j] === undefined) {
                    for (nLocalTr.appendChild(aoLocal[i][j].cell), aApplied[i][j] = 1; aoLocal[i + iRowspan] !== undefined && aoLocal[i][j].cell == aoLocal[i + iRowspan][j].cell; ) aApplied[i + iRowspan][j] = 1, 
                    iRowspan++;
                    for (;aoLocal[i][j + iColspan] !== undefined && aoLocal[i][j].cell == aoLocal[i][j + iColspan].cell; ) {
                        for (k = 0; k < iRowspan; k++) aApplied[i + k][j + iColspan] = 1;
                        iColspan++;
                    }
                    $(aoLocal[i][j].cell).attr("rowspan", iRowspan).attr("colspan", iColspan);
                }
            }
        }
    }
    function _fnDraw(oSettings) {
        var aPreDraw = _fnCallbackFire(oSettings, "aoPreDrawCallback", "preDraw", [ oSettings ]);
        if ($.inArray(!1, aPreDraw) !== -1) return void _fnProcessingDisplay(oSettings, !1);
        var anRows = [], iRowCount = 0, asStripeClasses = oSettings.asStripeClasses, iStripes = asStripeClasses.length, oLang = (oSettings.aoOpenRows.length, 
        oSettings.oLanguage), iInitDisplayStart = oSettings.iInitDisplayStart, bServerSide = "ssp" == _fnDataSource(oSettings), aiDisplay = oSettings.aiDisplay;
        oSettings.bDrawing = !0, iInitDisplayStart !== undefined && iInitDisplayStart !== -1 && (oSettings._iDisplayStart = bServerSide ? iInitDisplayStart : iInitDisplayStart >= oSettings.fnRecordsDisplay() ? 0 : iInitDisplayStart, 
        oSettings.iInitDisplayStart = -1);
        var iDisplayStart = oSettings._iDisplayStart, iDisplayEnd = oSettings.fnDisplayEnd();
        if (oSettings.bDeferLoading) oSettings.bDeferLoading = !1, oSettings.iDraw++, _fnProcessingDisplay(oSettings, !1); else if (bServerSide) {
            if (!oSettings.bDestroying && !_fnAjaxUpdate(oSettings)) return;
        } else oSettings.iDraw++;
        if (0 !== aiDisplay.length) for (var iStart = bServerSide ? 0 : iDisplayStart, iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd, j = iStart; j < iEnd; j++) {
            var iDataIndex = aiDisplay[j], aoData = oSettings.aoData[iDataIndex];
            null === aoData.nTr && _fnCreateTr(oSettings, iDataIndex);
            var nRow = aoData.nTr;
            if (0 !== iStripes) {
                var sStripe = asStripeClasses[iRowCount % iStripes];
                aoData._sRowStripe != sStripe && ($(nRow).removeClass(aoData._sRowStripe).addClass(sStripe), 
                aoData._sRowStripe = sStripe);
            }
            _fnCallbackFire(oSettings, "aoRowCallback", null, [ nRow, aoData._aData, iRowCount, j ]), 
            anRows.push(nRow), iRowCount++;
        } else {
            var sZero = oLang.sZeroRecords;
            1 == oSettings.iDraw && "ajax" == _fnDataSource(oSettings) ? sZero = oLang.sLoadingRecords : oLang.sEmptyTable && 0 === oSettings.fnRecordsTotal() && (sZero = oLang.sEmptyTable), 
            anRows[0] = $("<tr/>", {
                "class": iStripes ? asStripeClasses[0] : ""
            }).append($("<td />", {
                valign: "top",
                colSpan: _fnVisbleColumns(oSettings),
                "class": oSettings.oClasses.sRowEmpty
            }).html(sZero))[0];
        }
        _fnCallbackFire(oSettings, "aoHeaderCallback", "header", [ $(oSettings.nTHead).children("tr")[0], _fnGetDataMaster(oSettings), iDisplayStart, iDisplayEnd, aiDisplay ]), 
        _fnCallbackFire(oSettings, "aoFooterCallback", "footer", [ $(oSettings.nTFoot).children("tr")[0], _fnGetDataMaster(oSettings), iDisplayStart, iDisplayEnd, aiDisplay ]);
        var body = $(oSettings.nTBody);
        body.children().detach(), body.append($(anRows)), _fnCallbackFire(oSettings, "aoDrawCallback", "draw", [ oSettings ]), 
        oSettings.bSorted = !1, oSettings.bFiltered = !1, oSettings.bDrawing = !1;
    }
    function _fnReDraw(settings, holdPosition) {
        var features = settings.oFeatures, sort = features.bSort, filter = features.bFilter;
        sort && _fnSort(settings), filter ? _fnFilterComplete(settings, settings.oPreviousSearch) : settings.aiDisplay = settings.aiDisplayMaster.slice(), 
        holdPosition !== !0 && (settings._iDisplayStart = 0), settings._drawHold = holdPosition, 
        _fnDraw(settings), settings._drawHold = !1;
    }
    function _fnAddOptionsHtml(oSettings) {
        var classes = oSettings.oClasses, table = $(oSettings.nTable), holding = $("<div/>").insertBefore(table), features = oSettings.oFeatures, insert = $("<div/>", {
            id: oSettings.sTableId + "_wrapper",
            "class": classes.sWrapper + (oSettings.nTFoot ? "" : " " + classes.sNoFooter)
        });
        oSettings.nHolding = holding[0], oSettings.nTableWrapper = insert[0], oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
        for (var featureNode, cOption, nNewNode, cNext, sAttr, j, aDom = oSettings.sDom.split(""), i = 0; i < aDom.length; i++) {
            if (featureNode = null, cOption = aDom[i], "<" == cOption) {
                if (nNewNode = $("<div/>")[0], cNext = aDom[i + 1], "'" == cNext || '"' == cNext) {
                    for (sAttr = "", j = 2; aDom[i + j] != cNext; ) sAttr += aDom[i + j], j++;
                    if ("H" == sAttr ? sAttr = classes.sJUIHeader : "F" == sAttr && (sAttr = classes.sJUIFooter), 
                    sAttr.indexOf(".") != -1) {
                        var aSplit = sAttr.split(".");
                        nNewNode.id = aSplit[0].substr(1, aSplit[0].length - 1), nNewNode.className = aSplit[1];
                    } else "#" == sAttr.charAt(0) ? nNewNode.id = sAttr.substr(1, sAttr.length - 1) : nNewNode.className = sAttr;
                    i += j;
                }
                insert.append(nNewNode), insert = $(nNewNode);
            } else if (">" == cOption) insert = insert.parent(); else if ("l" == cOption && features.bPaginate && features.bLengthChange) featureNode = _fnFeatureHtmlLength(oSettings); else if ("f" == cOption && features.bFilter) featureNode = _fnFeatureHtmlFilter(oSettings); else if ("r" == cOption && features.bProcessing) featureNode = _fnFeatureHtmlProcessing(oSettings); else if ("t" == cOption) featureNode = _fnFeatureHtmlTable(oSettings); else if ("i" == cOption && features.bInfo) featureNode = _fnFeatureHtmlInfo(oSettings); else if ("p" == cOption && features.bPaginate) featureNode = _fnFeatureHtmlPaginate(oSettings); else if (0 !== DataTable.ext.feature.length) for (var aoFeatures = DataTable.ext.feature, k = 0, kLen = aoFeatures.length; k < kLen; k++) if (cOption == aoFeatures[k].cFeature) {
                featureNode = aoFeatures[k].fnInit(oSettings);
                break;
            }
            if (featureNode) {
                var aanFeatures = oSettings.aanFeatures;
                aanFeatures[cOption] || (aanFeatures[cOption] = []), aanFeatures[cOption].push(featureNode), 
                insert.append(featureNode);
            }
        }
        holding.replaceWith(insert), oSettings.nHolding = null;
    }
    function _fnDetectHeader(aLayout, nThead) {
        var nTr, nCell, i, k, l, iLen, iColShifted, iColumn, iColspan, iRowspan, bUnique, nTrs = $(nThead).children("tr"), fnShiftCol = function(a, i, j) {
            for (var k = a[i]; k[j]; ) j++;
            return j;
        };
        for (aLayout.splice(0, aLayout.length), i = 0, iLen = nTrs.length; i < iLen; i++) aLayout.push([]);
        for (i = 0, iLen = nTrs.length; i < iLen; i++) for (nTr = nTrs[i], iColumn = 0, 
        nCell = nTr.firstChild; nCell; ) {
            if ("TD" == nCell.nodeName.toUpperCase() || "TH" == nCell.nodeName.toUpperCase()) for (iColspan = 1 * nCell.getAttribute("colspan"), 
            iRowspan = 1 * nCell.getAttribute("rowspan"), iColspan = iColspan && 0 !== iColspan && 1 !== iColspan ? iColspan : 1, 
            iRowspan = iRowspan && 0 !== iRowspan && 1 !== iRowspan ? iRowspan : 1, iColShifted = fnShiftCol(aLayout, i, iColumn), 
            bUnique = 1 === iColspan, l = 0; l < iColspan; l++) for (k = 0; k < iRowspan; k++) aLayout[i + k][iColShifted + l] = {
                cell: nCell,
                unique: bUnique
            }, aLayout[i + k].nTr = nTr;
            nCell = nCell.nextSibling;
        }
    }
    function _fnGetUniqueThs(oSettings, nHeader, aLayout) {
        var aReturn = [];
        aLayout || (aLayout = oSettings.aoHeader, nHeader && (aLayout = [], _fnDetectHeader(aLayout, nHeader)));
        for (var i = 0, iLen = aLayout.length; i < iLen; i++) for (var j = 0, jLen = aLayout[i].length; j < jLen; j++) !aLayout[i][j].unique || aReturn[j] && oSettings.bSortCellsTop || (aReturn[j] = aLayout[i][j].cell);
        return aReturn;
    }
    function _fnBuildAjax(oSettings, data, fn) {
        if (_fnCallbackFire(oSettings, "aoServerParams", "serverParams", [ data ]), data && $.isArray(data)) {
            var tmp = {}, rbracket = /(.*?)\[\]$/;
            $.each(data, function(key, val) {
                var match = val.name.match(rbracket);
                if (match) {
                    var name = match[0];
                    tmp[name] || (tmp[name] = []), tmp[name].push(val.value);
                } else tmp[val.name] = val.value;
            }), data = tmp;
        }
        var ajaxData, ajax = oSettings.ajax, instance = oSettings.oInstance, callback = function(json) {
            _fnCallbackFire(oSettings, null, "xhr", [ oSettings, json, oSettings.jqXHR ]), fn(json);
        };
        if ($.isPlainObject(ajax) && ajax.data) {
            ajaxData = ajax.data;
            var newData = $.isFunction(ajaxData) ? ajaxData(data, oSettings) : ajaxData;
            data = $.isFunction(ajaxData) && newData ? newData : $.extend(!0, data, newData), 
            delete ajax.data;
        }
        var baseAjax = {
            data: data,
            success: function(json) {
                var error = json.error || json.sError;
                error && _fnLog(oSettings, 0, error), oSettings.json = json, callback(json);
            },
            dataType: "json",
            cache: !1,
            type: oSettings.sServerMethod,
            error: function(xhr, error, thrown) {
                var ret = _fnCallbackFire(oSettings, null, "xhr", [ oSettings, null, oSettings.jqXHR ]);
                $.inArray(!0, ret) === -1 && ("parsererror" == error ? _fnLog(oSettings, 0, "Invalid JSON response", 1) : 4 === xhr.readyState && _fnLog(oSettings, 0, "Ajax error", 7)), 
                _fnProcessingDisplay(oSettings, !1);
            }
        };
        oSettings.oAjaxData = data, _fnCallbackFire(oSettings, null, "preXhr", [ oSettings, data ]), 
        oSettings.fnServerData ? oSettings.fnServerData.call(instance, oSettings.sAjaxSource, $.map(data, function(val, key) {
            return {
                name: key,
                value: val
            };
        }), callback, oSettings) : oSettings.sAjaxSource || "string" == typeof ajax ? oSettings.jqXHR = $.ajax($.extend(baseAjax, {
            url: ajax || oSettings.sAjaxSource
        })) : $.isFunction(ajax) ? oSettings.jqXHR = ajax.call(instance, data, callback, oSettings) : (oSettings.jqXHR = $.ajax($.extend(baseAjax, ajax)), 
        ajax.data = ajaxData);
    }
    function _fnAjaxUpdate(settings) {
        return !settings.bAjaxDataGet || (settings.iDraw++, _fnProcessingDisplay(settings, !0), 
        _fnBuildAjax(settings, _fnAjaxParameters(settings), function(json) {
            _fnAjaxUpdateDraw(settings, json);
        }), !1);
    }
    function _fnAjaxParameters(settings) {
        var i, dataProp, column, columnSearch, columns = settings.aoColumns, columnCount = columns.length, features = settings.oFeatures, preSearch = settings.oPreviousSearch, preColSearch = settings.aoPreSearchCols, data = [], sort = _fnSortFlatten(settings), displayStart = settings._iDisplayStart, displayLength = features.bPaginate !== !1 ? settings._iDisplayLength : -1, param = function(name, value) {
            data.push({
                name: name,
                value: value
            });
        };
        param("sEcho", settings.iDraw), param("iColumns", columnCount), param("sColumns", _pluck(columns, "sName").join(",")), 
        param("iDisplayStart", displayStart), param("iDisplayLength", displayLength);
        var d = {
            draw: settings.iDraw,
            columns: [],
            order: [],
            start: displayStart,
            length: displayLength,
            search: {
                value: preSearch.sSearch,
                regex: preSearch.bRegex
            }
        };
        for (i = 0; i < columnCount; i++) column = columns[i], columnSearch = preColSearch[i], 
        dataProp = "function" == typeof column.mData ? "function" : column.mData, d.columns.push({
            data: dataProp,
            name: column.sName,
            searchable: column.bSearchable,
            orderable: column.bSortable,
            search: {
                value: columnSearch.sSearch,
                regex: columnSearch.bRegex
            }
        }), param("mDataProp_" + i, dataProp), features.bFilter && (param("sSearch_" + i, columnSearch.sSearch), 
        param("bRegex_" + i, columnSearch.bRegex), param("bSearchable_" + i, column.bSearchable)), 
        features.bSort && param("bSortable_" + i, column.bSortable);
        features.bFilter && (param("sSearch", preSearch.sSearch), param("bRegex", preSearch.bRegex)), 
        features.bSort && ($.each(sort, function(i, val) {
            d.order.push({
                column: val.col,
                dir: val.dir
            }), param("iSortCol_" + i, val.col), param("sSortDir_" + i, val.dir);
        }), param("iSortingCols", sort.length));
        var legacy = DataTable.ext.legacy.ajax;
        return null === legacy ? settings.sAjaxSource ? data : d : legacy ? data : d;
    }
    function _fnAjaxUpdateDraw(settings, json) {
        var compat = function(old, modern) {
            return json[old] !== undefined ? json[old] : json[modern];
        }, data = _fnAjaxDataSrc(settings, json), draw = compat("sEcho", "draw"), recordsTotal = compat("iTotalRecords", "recordsTotal"), recordsFiltered = compat("iTotalDisplayRecords", "recordsFiltered");
        if (draw) {
            if (1 * draw < settings.iDraw) return;
            settings.iDraw = 1 * draw;
        }
        _fnClearTable(settings), settings._iRecordsTotal = parseInt(recordsTotal, 10), settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
        for (var i = 0, ien = data.length; i < ien; i++) _fnAddData(settings, data[i]);
        settings.aiDisplay = settings.aiDisplayMaster.slice(), settings.bAjaxDataGet = !1, 
        _fnDraw(settings), settings._bInitComplete || _fnInitComplete(settings, json), settings.bAjaxDataGet = !0, 
        _fnProcessingDisplay(settings, !1);
    }
    function _fnAjaxDataSrc(oSettings, json) {
        var dataSrc = $.isPlainObject(oSettings.ajax) && oSettings.ajax.dataSrc !== undefined ? oSettings.ajax.dataSrc : oSettings.sAjaxDataProp;
        return "data" === dataSrc ? json.aaData || json[dataSrc] : "" !== dataSrc ? _fnGetObjectDataFn(dataSrc)(json) : json;
    }
    function _fnFeatureHtmlFilter(settings) {
        var classes = settings.oClasses, tableId = settings.sTableId, language = settings.oLanguage, previousSearch = settings.oPreviousSearch, features = settings.aanFeatures, input = '<input type="search" class="' + classes.sFilterInput + '"/>', str = language.sSearch;
        str = str.match(/_INPUT_/) ? str.replace("_INPUT_", input) : str + input;
        var filter = $("<div/>", {
            id: features.f ? null : tableId + "_filter",
            "class": classes.sFilter
        }).append($("<label/>").append(str)), searchFn = function() {
            var val = (features.f, this.value ? this.value : "");
            val != previousSearch.sSearch && (_fnFilterComplete(settings, {
                sSearch: val,
                bRegex: previousSearch.bRegex,
                bSmart: previousSearch.bSmart,
                bCaseInsensitive: previousSearch.bCaseInsensitive
            }), settings._iDisplayStart = 0, _fnDraw(settings));
        }, searchDelay = null !== settings.searchDelay ? settings.searchDelay : "ssp" === _fnDataSource(settings) ? 400 : 0, jqFilter = $("input", filter).val(previousSearch.sSearch).attr("placeholder", language.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", searchDelay ? _fnThrottle(searchFn, searchDelay) : searchFn).bind("keypress.DT", function(e) {
            if (13 == e.keyCode) return !1;
        }).attr("aria-controls", tableId);
        return $(settings.nTable).on("search.dt.DT", function(ev, s) {
            if (settings === s) try {
                jqFilter[0] !== document.activeElement && jqFilter.val(previousSearch.sSearch);
            } catch (e) {}
        }), filter[0];
    }
    function _fnFilterComplete(oSettings, oInput, iForce) {
        var oPrevSearch = oSettings.oPreviousSearch, aoPrevSearch = oSettings.aoPreSearchCols, fnSaveFilter = function(oFilter) {
            oPrevSearch.sSearch = oFilter.sSearch, oPrevSearch.bRegex = oFilter.bRegex, oPrevSearch.bSmart = oFilter.bSmart, 
            oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
        }, fnRegex = function(o) {
            return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
        };
        if (_fnColumnTypes(oSettings), "ssp" != _fnDataSource(oSettings)) {
            _fnFilter(oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive), 
            fnSaveFilter(oInput);
            for (var i = 0; i < aoPrevSearch.length; i++) _fnFilterColumn(oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]), aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive);
            _fnFilterCustom(oSettings);
        } else fnSaveFilter(oInput);
        oSettings.bFiltered = !0, _fnCallbackFire(oSettings, null, "search", [ oSettings ]);
    }
    function _fnFilterCustom(settings) {
        for (var row, rowIdx, filters = DataTable.ext.search, displayRows = settings.aiDisplay, i = 0, ien = filters.length; i < ien; i++) {
            for (var rows = [], j = 0, jen = displayRows.length; j < jen; j++) rowIdx = displayRows[j], 
            row = settings.aoData[rowIdx], filters[i](settings, row._aFilterData, rowIdx, row._aData, j) && rows.push(rowIdx);
            displayRows.length = 0, $.merge(displayRows, rows);
        }
    }
    function _fnFilterColumn(settings, searchStr, colIdx, regex, smart, caseInsensitive) {
        if ("" !== searchStr) for (var data, display = settings.aiDisplay, rpSearch = _fnFilterCreateSearch(searchStr, regex, smart, caseInsensitive), i = display.length - 1; i >= 0; i--) data = settings.aoData[display[i]]._aFilterData[colIdx], 
        rpSearch.test(data) || display.splice(i, 1);
    }
    function _fnFilter(settings, input, force, regex, smart, caseInsensitive) {
        var display, invalidated, i, rpSearch = _fnFilterCreateSearch(input, regex, smart, caseInsensitive), prevSearch = settings.oPreviousSearch.sSearch, displayMaster = settings.aiDisplayMaster;
        if (0 !== DataTable.ext.search.length && (force = !0), invalidated = _fnFilterData(settings), 
        input.length <= 0) settings.aiDisplay = displayMaster.slice(); else for ((invalidated || force || prevSearch.length > input.length || 0 !== input.indexOf(prevSearch) || settings.bSorted) && (settings.aiDisplay = displayMaster.slice()), 
        display = settings.aiDisplay, i = display.length - 1; i >= 0; i--) rpSearch.test(settings.aoData[display[i]]._sFilterRow) || display.splice(i, 1);
    }
    function _fnFilterCreateSearch(search, regex, smart, caseInsensitive) {
        if (search = regex ? search : _fnEscapeRegex(search), smart) {
            var a = $.map(search.match(/"[^"]+"|[^ ]+/g) || [ "" ], function(word) {
                if ('"' === word.charAt(0)) {
                    var m = word.match(/^"(.*)"$/);
                    word = m ? m[1] : word;
                }
                return word.replace('"', "");
            });
            search = "^(?=.*?" + a.join(")(?=.*?") + ").*$";
        }
        return new RegExp(search, caseInsensitive ? "i" : "");
    }
    function _fnFilterData(settings) {
        var column, i, j, ien, jen, filterData, cellData, row, columns = settings.aoColumns, fomatters = DataTable.ext.type.search, wasInvalidated = !1;
        for (i = 0, ien = settings.aoData.length; i < ien; i++) if (row = settings.aoData[i], 
        !row._aFilterData) {
            for (filterData = [], j = 0, jen = columns.length; j < jen; j++) column = columns[j], 
            column.bSearchable ? (cellData = _fnGetCellData(settings, i, j, "filter"), fomatters[column.sType] && (cellData = fomatters[column.sType](cellData)), 
            null === cellData && (cellData = ""), "string" != typeof cellData && cellData.toString && (cellData = cellData.toString())) : cellData = "", 
            cellData.indexOf && cellData.indexOf("&") !== -1 && (__filter_div.innerHTML = cellData, 
            cellData = __filter_div_textContent ? __filter_div.textContent : __filter_div.innerText), 
            cellData.replace && (cellData = cellData.replace(/[\r\n]/g, "")), filterData.push(cellData);
            row._aFilterData = filterData, row._sFilterRow = filterData.join("  "), wasInvalidated = !0;
        }
        return wasInvalidated;
    }
    function _fnSearchToCamel(obj) {
        return {
            search: obj.sSearch,
            smart: obj.bSmart,
            regex: obj.bRegex,
            caseInsensitive: obj.bCaseInsensitive
        };
    }
    function _fnSearchToHung(obj) {
        return {
            sSearch: obj.search,
            bSmart: obj.smart,
            bRegex: obj.regex,
            bCaseInsensitive: obj.caseInsensitive
        };
    }
    function _fnFeatureHtmlInfo(settings) {
        var tid = settings.sTableId, nodes = settings.aanFeatures.i, n = $("<div/>", {
            "class": settings.oClasses.sInfo,
            id: nodes ? null : tid + "_info"
        });
        return nodes || (settings.aoDrawCallback.push({
            fn: _fnUpdateInfo,
            sName: "information"
        }), n.attr("role", "status").attr("aria-live", "polite"), $(settings.nTable).attr("aria-describedby", tid + "_info")), 
        n[0];
    }
    function _fnUpdateInfo(settings) {
        var nodes = settings.aanFeatures.i;
        if (0 !== nodes.length) {
            var lang = settings.oLanguage, start = settings._iDisplayStart + 1, end = settings.fnDisplayEnd(), max = settings.fnRecordsTotal(), total = settings.fnRecordsDisplay(), out = total ? lang.sInfo : lang.sInfoEmpty;
            total !== max && (out += " " + lang.sInfoFiltered), out += lang.sInfoPostFix, out = _fnInfoMacros(settings, out);
            var callback = lang.fnInfoCallback;
            null !== callback && (out = callback.call(settings.oInstance, settings, start, end, max, total, out)), 
            $(nodes).html(out);
        }
    }
    function _fnInfoMacros(settings, str) {
        var formatter = settings.fnFormatNumber, start = settings._iDisplayStart + 1, len = settings._iDisplayLength, vis = settings.fnRecordsDisplay(), all = len === -1;
        return str.replace(/_START_/g, formatter.call(settings, start)).replace(/_END_/g, formatter.call(settings, settings.fnDisplayEnd())).replace(/_MAX_/g, formatter.call(settings, settings.fnRecordsTotal())).replace(/_TOTAL_/g, formatter.call(settings, vis)).replace(/_PAGE_/g, formatter.call(settings, all ? 1 : Math.ceil(start / len))).replace(/_PAGES_/g, formatter.call(settings, all ? 1 : Math.ceil(vis / len)));
    }
    function _fnInitialise(settings) {
        var i, iLen, column, iAjaxStart = settings.iInitDisplayStart, columns = settings.aoColumns, features = settings.oFeatures, deferLoading = settings.bDeferLoading;
        if (!settings.bInitialised) return void setTimeout(function() {
            _fnInitialise(settings);
        }, 200);
        for (_fnAddOptionsHtml(settings), _fnBuildHead(settings), _fnDrawHead(settings, settings.aoHeader), 
        _fnDrawHead(settings, settings.aoFooter), _fnProcessingDisplay(settings, !0), features.bAutoWidth && _fnCalculateColumnWidths(settings), 
        i = 0, iLen = columns.length; i < iLen; i++) column = columns[i], column.sWidth && (column.nTh.style.width = _fnStringToCss(column.sWidth));
        _fnCallbackFire(settings, null, "preInit", [ settings ]), _fnReDraw(settings);
        var dataSrc = _fnDataSource(settings);
        ("ssp" != dataSrc || deferLoading) && ("ajax" == dataSrc ? _fnBuildAjax(settings, [], function(json) {
            var aData = _fnAjaxDataSrc(settings, json);
            for (i = 0; i < aData.length; i++) _fnAddData(settings, aData[i]);
            settings.iInitDisplayStart = iAjaxStart, _fnReDraw(settings), _fnProcessingDisplay(settings, !1), 
            _fnInitComplete(settings, json);
        }, settings) : (_fnProcessingDisplay(settings, !1), _fnInitComplete(settings)));
    }
    function _fnInitComplete(settings, json) {
        settings._bInitComplete = !0, (json || settings.oInit.aaData) && _fnAdjustColumnSizing(settings), 
        _fnCallbackFire(settings, null, "plugin-init", [ settings, json ]), _fnCallbackFire(settings, "aoInitComplete", "init", [ settings, json ]);
    }
    function _fnLengthChange(settings, val) {
        var len = parseInt(val, 10);
        settings._iDisplayLength = len, _fnLengthOverflow(settings), _fnCallbackFire(settings, null, "length", [ settings, len ]);
    }
    function _fnFeatureHtmlLength(settings) {
        for (var classes = settings.oClasses, tableId = settings.sTableId, menu = settings.aLengthMenu, d2 = $.isArray(menu[0]), lengths = d2 ? menu[0] : menu, language = d2 ? menu[1] : menu, select = $("<select/>", {
            name: tableId + "_length",
            "aria-controls": tableId,
            "class": classes.sLengthSelect
        }), i = 0, ien = lengths.length; i < ien; i++) select[0][i] = new Option(language[i], lengths[i]);
        var div = $("<div><label/></div>").addClass(classes.sLength);
        return settings.aanFeatures.l || (div[0].id = tableId + "_length"), div.children().append(settings.oLanguage.sLengthMenu.replace("_MENU_", select[0].outerHTML)), 
        $("select", div).val(settings._iDisplayLength).bind("change.DT", function(e) {
            _fnLengthChange(settings, $(this).val()), _fnDraw(settings);
        }), $(settings.nTable).bind("length.dt.DT", function(e, s, len) {
            settings === s && $("select", div).val(len);
        }), div[0];
    }
    function _fnFeatureHtmlPaginate(settings) {
        var type = settings.sPaginationType, plugin = DataTable.ext.pager[type], modern = "function" == typeof plugin, redraw = function(settings) {
            _fnDraw(settings);
        }, node = $("<div/>").addClass(settings.oClasses.sPaging + type)[0], features = settings.aanFeatures;
        return modern || plugin.fnInit(settings, node, redraw), features.p || (node.id = settings.sTableId + "_paginate", 
        settings.aoDrawCallback.push({
            fn: function(settings) {
                if (modern) {
                    var i, ien, start = settings._iDisplayStart, len = settings._iDisplayLength, visRecords = settings.fnRecordsDisplay(), all = len === -1, page = all ? 0 : Math.ceil(start / len), pages = all ? 1 : Math.ceil(visRecords / len), buttons = plugin(page, pages);
                    for (i = 0, ien = features.p.length; i < ien; i++) _fnRenderer(settings, "pageButton")(settings, features.p[i], i, buttons, page, pages);
                } else plugin.fnUpdate(settings, redraw);
            },
            sName: "pagination"
        })), node;
    }
    function _fnPageChange(settings, action, redraw) {
        var start = settings._iDisplayStart, len = settings._iDisplayLength, records = settings.fnRecordsDisplay();
        0 === records || len === -1 ? start = 0 : "number" == typeof action ? (start = action * len, 
        start > records && (start = 0)) : "first" == action ? start = 0 : "previous" == action ? (start = len >= 0 ? start - len : 0, 
        start < 0 && (start = 0)) : "next" == action ? start + len < records && (start += len) : "last" == action ? start = Math.floor((records - 1) / len) * len : _fnLog(settings, 0, "Unknown paging action: " + action, 5);
        var changed = settings._iDisplayStart !== start;
        return settings._iDisplayStart = start, changed && (_fnCallbackFire(settings, null, "page", [ settings ]), 
        redraw && _fnDraw(settings)), changed;
    }
    function _fnFeatureHtmlProcessing(settings) {
        return $("<div/>", {
            id: settings.aanFeatures.r ? null : settings.sTableId + "_processing",
            "class": settings.oClasses.sProcessing
        }).html(settings.oLanguage.sProcessing).insertBefore(settings.nTable)[0];
    }
    function _fnProcessingDisplay(settings, show) {
        settings.oFeatures.bProcessing && $(settings.aanFeatures.r).css("display", show ? "block" : "none"), 
        _fnCallbackFire(settings, null, "processing", [ settings, show ]);
    }
    function _fnFeatureHtmlTable(settings) {
        var table = $(settings.nTable);
        table.attr("role", "grid");
        var scroll = settings.oScroll;
        if ("" === scroll.sX && "" === scroll.sY) return settings.nTable;
        var scrollX = scroll.sX, scrollY = scroll.sY, classes = settings.oClasses, caption = table.children("caption"), captionSide = caption.length ? caption[0]._captionSide : null, headerClone = $(table[0].cloneNode(!1)), footerClone = $(table[0].cloneNode(!1)), footer = table.children("tfoot"), _div = "<div/>", size = function(s) {
            return s ? _fnStringToCss(s) : null;
        };
        footer.length || (footer = null);
        var scroller = $(_div, {
            "class": classes.sScrollWrapper
        }).append($(_div, {
            "class": classes.sScrollHead
        }).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: scrollX ? size(scrollX) : "100%"
        }).append($(_div, {
            "class": classes.sScrollHeadInner
        }).css({
            "box-sizing": "content-box",
            width: scroll.sXInner || "100%"
        }).append(headerClone.removeAttr("id").css("margin-left", 0).append("top" === captionSide ? caption : null).append(table.children("thead"))))).append($(_div, {
            "class": classes.sScrollBody
        }).css({
            position: "relative",
            overflow: "auto",
            width: size(scrollX)
        }).append(table));
        footer && scroller.append($(_div, {
            "class": classes.sScrollFoot
        }).css({
            overflow: "hidden",
            border: 0,
            width: scrollX ? size(scrollX) : "100%"
        }).append($(_div, {
            "class": classes.sScrollFootInner
        }).append(footerClone.removeAttr("id").css("margin-left", 0).append("bottom" === captionSide ? caption : null).append(table.children("tfoot")))));
        var children = scroller.children(), scrollHead = children[0], scrollBody = children[1], scrollFoot = footer ? children[2] : null;
        return scrollX && $(scrollBody).on("scroll.DT", function(e) {
            var scrollLeft = this.scrollLeft;
            scrollHead.scrollLeft = scrollLeft, footer && (scrollFoot.scrollLeft = scrollLeft);
        }), $(scrollBody).css(scrollY && scroll.bCollapse ? "max-height" : "height", scrollY), 
        settings.nScrollHead = scrollHead, settings.nScrollBody = scrollBody, settings.nScrollFoot = scrollFoot, 
        settings.aoDrawCallback.push({
            fn: _fnScrollDraw,
            sName: "scrolling"
        }), scroller[0];
    }
    function _fnScrollDraw(settings) {
        var headerTrgEls, footerTrgEls, headerSrcEls, footerSrcEls, headerCopy, footerCopy, idx, correction, sanityWidth, scroll = settings.oScroll, scrollX = scroll.sX, scrollXInner = scroll.sXInner, scrollY = scroll.sY, barWidth = scroll.iBarWidth, divHeader = $(settings.nScrollHead), divHeaderStyle = divHeader[0].style, divHeaderInner = divHeader.children("div"), divHeaderInnerStyle = divHeaderInner[0].style, divHeaderTable = divHeaderInner.children("table"), divBodyEl = settings.nScrollBody, divBody = $(divBodyEl), divBodyStyle = divBodyEl.style, divFooter = $(settings.nScrollFoot), divFooterInner = divFooter.children("div"), divFooterTable = divFooterInner.children("table"), header = $(settings.nTHead), table = $(settings.nTable), tableEl = table[0], tableStyle = tableEl.style, footer = settings.nTFoot ? $(settings.nTFoot) : null, browser = settings.oBrowser, ie67 = browser.bScrollOversize, dtHeaderCells = _pluck(settings.aoColumns, "nTh"), headerWidths = [], footerWidths = [], headerContent = [], footerContent = [], zeroOut = function(nSizer) {
            var style = nSizer.style;
            style.paddingTop = "0", style.paddingBottom = "0", style.borderTopWidth = "0", style.borderBottomWidth = "0", 
            style.height = 0;
        }, scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
        if (settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined) return settings.scrollBarVis = scrollBarVis, 
        void _fnAdjustColumnSizing(settings);
        settings.scrollBarVis = scrollBarVis, table.children("thead, tfoot").remove(), footer && (footerCopy = footer.clone().prependTo(table), 
        footerTrgEls = footer.find("tr"), footerSrcEls = footerCopy.find("tr")), headerCopy = header.clone().prependTo(table), 
        headerTrgEls = header.find("tr"), headerSrcEls = headerCopy.find("tr"), headerCopy.find("th, td").removeAttr("tabindex"), 
        scrollX || (divBodyStyle.width = "100%", divHeader[0].style.width = "100%"), $.each(_fnGetUniqueThs(settings, headerCopy), function(i, el) {
            idx = _fnVisibleToColumnIndex(settings, i), el.style.width = settings.aoColumns[idx].sWidth;
        }), footer && _fnApplyToChildren(function(n) {
            n.style.width = "";
        }, footerSrcEls), sanityWidth = table.outerWidth(), "" === scrollX ? (tableStyle.width = "100%", 
        ie67 && (table.find("tbody").height() > divBodyEl.offsetHeight || "scroll" == divBody.css("overflow-y")) && (tableStyle.width = _fnStringToCss(table.outerWidth() - barWidth)), 
        sanityWidth = table.outerWidth()) : "" !== scrollXInner && (tableStyle.width = _fnStringToCss(scrollXInner), 
        sanityWidth = table.outerWidth()), _fnApplyToChildren(zeroOut, headerSrcEls), _fnApplyToChildren(function(nSizer) {
            headerContent.push(nSizer.innerHTML), headerWidths.push(_fnStringToCss($(nSizer).css("width")));
        }, headerSrcEls), _fnApplyToChildren(function(nToSize, i) {
            $.inArray(nToSize, dtHeaderCells) !== -1 && (nToSize.style.width = headerWidths[i]);
        }, headerTrgEls), $(headerSrcEls).height(0), footer && (_fnApplyToChildren(zeroOut, footerSrcEls), 
        _fnApplyToChildren(function(nSizer) {
            footerContent.push(nSizer.innerHTML), footerWidths.push(_fnStringToCss($(nSizer).css("width")));
        }, footerSrcEls), _fnApplyToChildren(function(nToSize, i) {
            nToSize.style.width = footerWidths[i];
        }, footerTrgEls), $(footerSrcEls).height(0)), _fnApplyToChildren(function(nSizer, i) {
            nSizer.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + headerContent[i] + "</div>", 
            nSizer.style.width = headerWidths[i];
        }, headerSrcEls), footer && _fnApplyToChildren(function(nSizer, i) {
            nSizer.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + footerContent[i] + "</div>", 
            nSizer.style.width = footerWidths[i];
        }, footerSrcEls), table.outerWidth() < sanityWidth ? (correction = divBodyEl.scrollHeight > divBodyEl.offsetHeight || "scroll" == divBody.css("overflow-y") ? sanityWidth + barWidth : sanityWidth, 
        ie67 && (divBodyEl.scrollHeight > divBodyEl.offsetHeight || "scroll" == divBody.css("overflow-y")) && (tableStyle.width = _fnStringToCss(correction - barWidth)), 
        "" !== scrollX && "" === scrollXInner || _fnLog(settings, 1, "Possible column misalignment", 6)) : correction = "100%", 
        divBodyStyle.width = _fnStringToCss(correction), divHeaderStyle.width = _fnStringToCss(correction), 
        footer && (settings.nScrollFoot.style.width = _fnStringToCss(correction)), scrollY || ie67 && (divBodyStyle.height = _fnStringToCss(tableEl.offsetHeight + barWidth));
        var iOuterWidth = table.outerWidth();
        divHeaderTable[0].style.width = _fnStringToCss(iOuterWidth), divHeaderInnerStyle.width = _fnStringToCss(iOuterWidth);
        var bScrolling = table.height() > divBodyEl.clientHeight || "scroll" == divBody.css("overflow-y"), padding = "padding" + (browser.bScrollbarLeft ? "Left" : "Right");
        divHeaderInnerStyle[padding] = bScrolling ? barWidth + "px" : "0px", footer && (divFooterTable[0].style.width = _fnStringToCss(iOuterWidth), 
        divFooterInner[0].style.width = _fnStringToCss(iOuterWidth), divFooterInner[0].style[padding] = bScrolling ? barWidth + "px" : "0px"), 
        table.children("colgroup").insertBefore(table.children("thead")), divBody.scroll(), 
        !settings.bSorted && !settings.bFiltered || settings._drawHold || (divBodyEl.scrollTop = 0);
    }
    function _fnApplyToChildren(fn, an1, an2) {
        for (var nNode1, nNode2, index = 0, i = 0, iLen = an1.length; i < iLen; ) {
            for (nNode1 = an1[i].firstChild, nNode2 = an2 ? an2[i].firstChild : null; nNode1; ) 1 === nNode1.nodeType && (an2 ? fn(nNode1, nNode2, index) : fn(nNode1, index), 
            index++), nNode1 = nNode1.nextSibling, nNode2 = an2 ? nNode2.nextSibling : null;
            i++;
        }
    }
    function _fnCalculateColumnWidths(oSettings) {
        var i, column, columnIdx, table = oSettings.nTable, columns = oSettings.aoColumns, scroll = oSettings.oScroll, scrollY = scroll.sY, scrollX = scroll.sX, scrollXInner = scroll.sXInner, columnCount = columns.length, visibleColumns = _fnGetColumns(oSettings, "bVisible"), headerCells = $("th", oSettings.nTHead), tableWidthAttr = table.getAttribute("width"), tableContainer = table.parentNode, userInputs = !1, browser = oSettings.oBrowser, ie67 = browser.bScrollOversize, styleWidth = table.style.width;
        for (styleWidth && styleWidth.indexOf("%") !== -1 && (tableWidthAttr = styleWidth), 
        i = 0; i < visibleColumns.length; i++) column = columns[visibleColumns[i]], null !== column.sWidth && (column.sWidth = _fnConvertToWidth(column.sWidthOrig, tableContainer), 
        userInputs = !0);
        if (ie67 || !userInputs && !scrollX && !scrollY && columnCount == _fnVisbleColumns(oSettings) && columnCount == headerCells.length) for (i = 0; i < columnCount; i++) {
            var colIdx = _fnVisibleToColumnIndex(oSettings, i);
            null !== colIdx && (columns[colIdx].sWidth = _fnStringToCss(headerCells.eq(i).width()));
        } else {
            var tmpTable = $(table).clone().css("visibility", "hidden").removeAttr("id");
            tmpTable.find("tbody tr").remove();
            var tr = $("<tr/>").appendTo(tmpTable.find("tbody"));
            for (tmpTable.find("thead, tfoot").remove(), tmpTable.append($(oSettings.nTHead).clone()).append($(oSettings.nTFoot).clone()), 
            tmpTable.find("tfoot th, tfoot td").css("width", ""), headerCells = _fnGetUniqueThs(oSettings, tmpTable.find("thead")[0]), 
            i = 0; i < visibleColumns.length; i++) column = columns[visibleColumns[i]], headerCells[i].style.width = null !== column.sWidthOrig && "" !== column.sWidthOrig ? _fnStringToCss(column.sWidthOrig) : "", 
            column.sWidthOrig && scrollX && $(headerCells[i]).append($("<div/>").css({
                width: column.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (oSettings.aoData.length) for (i = 0; i < visibleColumns.length; i++) columnIdx = visibleColumns[i], 
            column = columns[columnIdx], $(_fnGetWidestNode(oSettings, columnIdx)).clone(!1).append(column.sContentPadding).appendTo(tr);
            $("[name]", tmpTable).removeAttr("name");
            var holder = $("<div/>").css(scrollX || scrollY ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(tmpTable).appendTo(tableContainer);
            scrollX && scrollXInner ? tmpTable.width(scrollXInner) : scrollX ? (tmpTable.css("width", "auto"), 
            tmpTable.removeAttr("width"), tmpTable.width() < tableContainer.clientWidth && tableWidthAttr && tmpTable.width(tableContainer.clientWidth)) : scrollY ? tmpTable.width(tableContainer.clientWidth) : tableWidthAttr && tmpTable.width(tableWidthAttr);
            var total = 0;
            for (i = 0; i < visibleColumns.length; i++) {
                var cell = $(headerCells[i]), border = cell.outerWidth() - cell.width(), bounding = browser.bBounding ? Math.ceil(headerCells[i].getBoundingClientRect().width) : cell.outerWidth();
                total += bounding, columns[visibleColumns[i]].sWidth = _fnStringToCss(bounding - border);
            }
            table.style.width = _fnStringToCss(total), holder.remove();
        }
        if (tableWidthAttr && (table.style.width = _fnStringToCss(tableWidthAttr)), (tableWidthAttr || scrollX) && !oSettings._reszEvt) {
            var bindResize = function() {
                $(window).bind("resize.DT-" + oSettings.sInstance, _fnThrottle(function() {
                    _fnAdjustColumnSizing(oSettings);
                }));
            };
            ie67 ? setTimeout(bindResize, 1e3) : bindResize(), oSettings._reszEvt = !0;
        }
    }
    function _fnConvertToWidth(width, parent) {
        if (!width) return 0;
        var n = $("<div/>").css("width", _fnStringToCss(width)).appendTo(parent || document.body), val = n[0].offsetWidth;
        return n.remove(), val;
    }
    function _fnGetWidestNode(settings, colIdx) {
        var idx = _fnGetMaxLenString(settings, colIdx);
        if (idx < 0) return null;
        var data = settings.aoData[idx];
        return data.nTr ? data.anCells[colIdx] : $("<td/>").html(_fnGetCellData(settings, idx, colIdx, "display"))[0];
    }
    function _fnGetMaxLenString(settings, colIdx) {
        for (var s, max = -1, maxIdx = -1, i = 0, ien = settings.aoData.length; i < ien; i++) s = _fnGetCellData(settings, i, colIdx, "display") + "", 
        s = s.replace(__re_html_remove, ""), s = s.replace(/&nbsp;/g, " "), s.length > max && (max = s.length, 
        maxIdx = i);
        return maxIdx;
    }
    function _fnStringToCss(s) {
        return null === s ? "0px" : "number" == typeof s ? s < 0 ? "0px" : s + "px" : s.match(/\d$/) ? s + "px" : s;
    }
    function _fnSortFlatten(settings) {
        var i, k, kLen, aDataSort, iCol, sType, srcCol, aSort = [], aoColumns = settings.aoColumns, fixed = settings.aaSortingFixed, fixedObj = $.isPlainObject(fixed), nestedSort = [], add = function(a) {
            a.length && !$.isArray(a[0]) ? nestedSort.push(a) : $.merge(nestedSort, a);
        };
        for ($.isArray(fixed) && add(fixed), fixedObj && fixed.pre && add(fixed.pre), add(settings.aaSorting), 
        fixedObj && fixed.post && add(fixed.post), i = 0; i < nestedSort.length; i++) for (srcCol = nestedSort[i][0], 
        aDataSort = aoColumns[srcCol].aDataSort, k = 0, kLen = aDataSort.length; k < kLen; k++) iCol = aDataSort[k], 
        sType = aoColumns[iCol].sType || "string", nestedSort[i]._idx === undefined && (nestedSort[i]._idx = $.inArray(nestedSort[i][1], aoColumns[iCol].asSorting)), 
        aSort.push({
            src: srcCol,
            col: iCol,
            dir: nestedSort[i][1],
            index: nestedSort[i]._idx,
            type: sType,
            formatter: DataTable.ext.type.order[sType + "-pre"]
        });
        return aSort;
    }
    function _fnSort(oSettings) {
        var i, ien, iLen, sortCol, aSort, aiOrig = [], oExtSort = DataTable.ext.type.order, aoData = oSettings.aoData, formatters = (oSettings.aoColumns, 
        0), displayMaster = oSettings.aiDisplayMaster;
        for (_fnColumnTypes(oSettings), aSort = _fnSortFlatten(oSettings), i = 0, ien = aSort.length; i < ien; i++) sortCol = aSort[i], 
        sortCol.formatter && formatters++, _fnSortData(oSettings, sortCol.col);
        if ("ssp" != _fnDataSource(oSettings) && 0 !== aSort.length) {
            for (i = 0, iLen = displayMaster.length; i < iLen; i++) aiOrig[displayMaster[i]] = i;
            formatters === aSort.length ? displayMaster.sort(function(a, b) {
                var x, y, k, test, sort, len = aSort.length, dataA = aoData[a]._aSortData, dataB = aoData[b]._aSortData;
                for (k = 0; k < len; k++) if (sort = aSort[k], x = dataA[sort.col], y = dataB[sort.col], 
                test = x < y ? -1 : x > y ? 1 : 0, 0 !== test) return "asc" === sort.dir ? test : -test;
                return x = aiOrig[a], y = aiOrig[b], x < y ? -1 : x > y ? 1 : 0;
            }) : displayMaster.sort(function(a, b) {
                var x, y, k, test, sort, fn, len = aSort.length, dataA = aoData[a]._aSortData, dataB = aoData[b]._aSortData;
                for (k = 0; k < len; k++) if (sort = aSort[k], x = dataA[sort.col], y = dataB[sort.col], 
                fn = oExtSort[sort.type + "-" + sort.dir] || oExtSort["string-" + sort.dir], test = fn(x, y), 
                0 !== test) return test;
                return x = aiOrig[a], y = aiOrig[b], x < y ? -1 : x > y ? 1 : 0;
            });
        }
        oSettings.bSorted = !0;
    }
    function _fnSortAria(settings) {
        for (var label, nextSort, columns = settings.aoColumns, aSort = _fnSortFlatten(settings), oAria = settings.oLanguage.oAria, i = 0, iLen = columns.length; i < iLen; i++) {
            var col = columns[i], asSorting = col.asSorting, sTitle = col.sTitle.replace(/<.*?>/g, ""), th = col.nTh;
            th.removeAttribute("aria-sort"), col.bSortable ? (aSort.length > 0 && aSort[0].col == i ? (th.setAttribute("aria-sort", "asc" == aSort[0].dir ? "ascending" : "descending"), 
            nextSort = asSorting[aSort[0].index + 1] || asSorting[0]) : nextSort = asSorting[0], 
            label = sTitle + ("asc" === nextSort ? oAria.sSortAscending : oAria.sSortDescending)) : label = sTitle, 
            th.setAttribute("aria-label", label);
        }
    }
    function _fnSortListener(settings, colIdx, append, callback) {
        var nextSortIdx, col = settings.aoColumns[colIdx], sorting = settings.aaSorting, asSorting = col.asSorting, next = function(a, overflow) {
            var idx = a._idx;
            return idx === undefined && (idx = $.inArray(a[1], asSorting)), idx + 1 < asSorting.length ? idx + 1 : overflow ? null : 0;
        };
        if ("number" == typeof sorting[0] && (sorting = settings.aaSorting = [ sorting ]), 
        append && settings.oFeatures.bSortMulti) {
            var sortIdx = $.inArray(colIdx, _pluck(sorting, "0"));
            sortIdx !== -1 ? (nextSortIdx = next(sorting[sortIdx], !0), null === nextSortIdx && 1 === sorting.length && (nextSortIdx = 0), 
            null === nextSortIdx ? sorting.splice(sortIdx, 1) : (sorting[sortIdx][1] = asSorting[nextSortIdx], 
            sorting[sortIdx]._idx = nextSortIdx)) : (sorting.push([ colIdx, asSorting[0], 0 ]), 
            sorting[sorting.length - 1]._idx = 0);
        } else sorting.length && sorting[0][0] == colIdx ? (nextSortIdx = next(sorting[0]), 
        sorting.length = 1, sorting[0][1] = asSorting[nextSortIdx], sorting[0]._idx = nextSortIdx) : (sorting.length = 0, 
        sorting.push([ colIdx, asSorting[0] ]), sorting[0]._idx = 0);
        _fnReDraw(settings), "function" == typeof callback && callback(settings);
    }
    function _fnSortAttachListener(settings, attachTo, colIdx, callback) {
        var col = settings.aoColumns[colIdx];
        _fnBindAction(attachTo, {}, function(e) {
            col.bSortable !== !1 && (settings.oFeatures.bProcessing ? (_fnProcessingDisplay(settings, !0), 
            setTimeout(function() {
                _fnSortListener(settings, colIdx, e.shiftKey, callback), "ssp" !== _fnDataSource(settings) && _fnProcessingDisplay(settings, !1);
            }, 0)) : _fnSortListener(settings, colIdx, e.shiftKey, callback));
        });
    }
    function _fnSortingClasses(settings) {
        var i, ien, colIdx, oldSort = settings.aLastSort, sortClass = settings.oClasses.sSortColumn, sort = _fnSortFlatten(settings), features = settings.oFeatures;
        if (features.bSort && features.bSortClasses) {
            for (i = 0, ien = oldSort.length; i < ien; i++) colIdx = oldSort[i].src, $(_pluck(settings.aoData, "anCells", colIdx)).removeClass(sortClass + (i < 2 ? i + 1 : 3));
            for (i = 0, ien = sort.length; i < ien; i++) colIdx = sort[i].src, $(_pluck(settings.aoData, "anCells", colIdx)).addClass(sortClass + (i < 2 ? i + 1 : 3));
        }
        settings.aLastSort = sort;
    }
    function _fnSortData(settings, idx) {
        var customData, column = settings.aoColumns[idx], customSort = DataTable.ext.order[column.sSortDataType];
        customSort && (customData = customSort.call(settings.oInstance, settings, idx, _fnColumnIndexToVisible(settings, idx)));
        for (var row, cellData, formatter = DataTable.ext.type.order[column.sType + "-pre"], i = 0, ien = settings.aoData.length; i < ien; i++) row = settings.aoData[i], 
        row._aSortData || (row._aSortData = []), row._aSortData[idx] && !customSort || (cellData = customSort ? customData[i] : _fnGetCellData(settings, i, idx, "sort"), 
        row._aSortData[idx] = formatter ? formatter(cellData) : cellData);
    }
    function _fnSaveState(settings) {
        if (settings.oFeatures.bStateSave && !settings.bDestroying) {
            var state = {
                time: +new Date(),
                start: settings._iDisplayStart,
                length: settings._iDisplayLength,
                order: $.extend(!0, [], settings.aaSorting),
                search: _fnSearchToCamel(settings.oPreviousSearch),
                columns: $.map(settings.aoColumns, function(col, i) {
                    return {
                        visible: col.bVisible,
                        search: _fnSearchToCamel(settings.aoPreSearchCols[i])
                    };
                })
            };
            _fnCallbackFire(settings, "aoStateSaveParams", "stateSaveParams", [ settings, state ]), 
            settings.oSavedState = state, settings.fnStateSaveCallback.call(settings.oInstance, settings, state);
        }
    }
    function _fnLoadState(settings, oInit) {
        var i, ien, columns = settings.aoColumns;
        if (settings.oFeatures.bStateSave) {
            var state = settings.fnStateLoadCallback.call(settings.oInstance, settings);
            if (state && state.time) {
                var abStateLoad = _fnCallbackFire(settings, "aoStateLoadParams", "stateLoadParams", [ settings, state ]);
                if ($.inArray(!1, abStateLoad) === -1) {
                    var duration = settings.iStateDuration;
                    if (!(duration > 0 && state.time < +new Date() - 1e3 * duration) && columns.length === state.columns.length) {
                        for (settings.oLoadedState = $.extend(!0, {}, state), state.start !== undefined && (settings._iDisplayStart = state.start, 
                        settings.iInitDisplayStart = state.start), state.length !== undefined && (settings._iDisplayLength = state.length), 
                        state.order !== undefined && (settings.aaSorting = [], $.each(state.order, function(i, col) {
                            settings.aaSorting.push(col[0] >= columns.length ? [ 0, col[1] ] : col);
                        })), state.search !== undefined && $.extend(settings.oPreviousSearch, _fnSearchToHung(state.search)), 
                        i = 0, ien = state.columns.length; i < ien; i++) {
                            var col = state.columns[i];
                            col.visible !== undefined && (columns[i].bVisible = col.visible), col.search !== undefined && $.extend(settings.aoPreSearchCols[i], _fnSearchToHung(col.search));
                        }
                        _fnCallbackFire(settings, "aoStateLoaded", "stateLoaded", [ settings, state ]);
                    }
                }
            }
        }
    }
    function _fnSettingsFromNode(table) {
        var settings = DataTable.settings, idx = $.inArray(table, _pluck(settings, "nTable"));
        return idx !== -1 ? settings[idx] : null;
    }
    function _fnLog(settings, level, msg, tn) {
        if (msg = "DataTables warning: " + (settings ? "table id=" + settings.sTableId + " - " : "") + msg, 
        tn && (msg += ". For more information about this error, please see http://datatables.net/tn/" + tn), 
        level) window.console && console.log && console.log(msg); else {
            var ext = DataTable.ext, type = ext.sErrMode || ext.errMode;
            if (settings && _fnCallbackFire(settings, null, "error", [ settings, tn, msg ]), 
            "alert" == type) alert(msg); else {
                if ("throw" == type) throw new Error(msg);
                "function" == typeof type && type(settings, tn, msg);
            }
        }
    }
    function _fnMap(ret, src, name, mappedName) {
        return $.isArray(name) ? void $.each(name, function(i, val) {
            $.isArray(val) ? _fnMap(ret, src, val[0], val[1]) : _fnMap(ret, src, val);
        }) : (mappedName === undefined && (mappedName = name), void (src[name] !== undefined && (ret[mappedName] = src[name])));
    }
    function _fnExtend(out, extender, breakRefs) {
        var val;
        for (var prop in extender) extender.hasOwnProperty(prop) && (val = extender[prop], 
        $.isPlainObject(val) ? ($.isPlainObject(out[prop]) || (out[prop] = {}), $.extend(!0, out[prop], val)) : breakRefs && "data" !== prop && "aaData" !== prop && $.isArray(val) ? out[prop] = val.slice() : out[prop] = val);
        return out;
    }
    function _fnBindAction(n, oData, fn) {
        $(n).bind("click.DT", oData, function(e) {
            n.blur(), fn(e);
        }).bind("keypress.DT", oData, function(e) {
            13 === e.which && (e.preventDefault(), fn(e));
        }).bind("selectstart.DT", function() {
            return !1;
        });
    }
    function _fnCallbackReg(oSettings, sStore, fn, sName) {
        fn && oSettings[sStore].push({
            fn: fn,
            sName: sName
        });
    }
    function _fnCallbackFire(settings, callbackArr, eventName, args) {
        var ret = [];
        if (callbackArr && (ret = $.map(settings[callbackArr].slice().reverse(), function(val, i) {
            return val.fn.apply(settings.oInstance, args);
        })), null !== eventName) {
            var e = $.Event(eventName + ".dt");
            $(settings.nTable).trigger(e, args), ret.push(e.result);
        }
        return ret;
    }
    function _fnLengthOverflow(settings) {
        var start = settings._iDisplayStart, end = settings.fnDisplayEnd(), len = settings._iDisplayLength;
        start >= end && (start = end - len), start -= start % len, (len === -1 || start < 0) && (start = 0), 
        settings._iDisplayStart = start;
    }
    function _fnRenderer(settings, type) {
        var renderer = settings.renderer, host = DataTable.ext.renderer[type];
        return $.isPlainObject(renderer) && renderer[type] ? host[renderer[type]] || host._ : "string" == typeof renderer ? host[renderer] || host._ : host._;
    }
    function _fnDataSource(settings) {
        return settings.oFeatures.bServerSide ? "ssp" : settings.ajax || settings.sAjaxSource ? "ajax" : "dom";
    }
    function _numbers(page, pages) {
        var numbers = [], buttons = extPagination.numbers_length, half = Math.floor(buttons / 2);
        return pages <= buttons ? numbers = _range(0, pages) : page <= half ? (numbers = _range(0, buttons - 2), 
        numbers.push("ellipsis"), numbers.push(pages - 1)) : page >= pages - 1 - half ? (numbers = _range(pages - (buttons - 2), pages), 
        numbers.splice(0, 0, "ellipsis"), numbers.splice(0, 0, 0)) : (numbers = _range(page - half + 2, page + half - 1), 
        numbers.push("ellipsis"), numbers.push(pages - 1), numbers.splice(0, 0, "ellipsis"), 
        numbers.splice(0, 0, 0)), numbers.DT_el = "span", numbers;
    }
    function _addNumericSort(decimalPlace) {
        $.each({
            num: function(d) {
                return __numericReplace(d, decimalPlace);
            },
            "num-fmt": function(d) {
                return __numericReplace(d, decimalPlace, _re_formatted_numeric);
            },
            "html-num": function(d) {
                return __numericReplace(d, decimalPlace, _re_html);
            },
            "html-num-fmt": function(d) {
                return __numericReplace(d, decimalPlace, _re_html, _re_formatted_numeric);
            }
        }, function(key, fn) {
            _ext.type.order[key + decimalPlace + "-pre"] = fn, key.match(/^html\-/) && (_ext.type.search[key + decimalPlace] = _ext.type.search.html);
        });
    }
    function _fnExternApiFunc(fn) {
        return function() {
            var args = [ _fnSettingsFromNode(this[DataTable.ext.iApiIndex]) ].concat(Array.prototype.slice.call(arguments));
            return DataTable.ext.internal[fn].apply(this, args);
        };
    }
    var _ext, _Api, _api_register, _api_registerPlural, DataTable = function(options) {
        this.$ = function(sSelector, oOpts) {
            return this.api(!0).$(sSelector, oOpts);
        }, this._ = function(sSelector, oOpts) {
            return this.api(!0).rows(sSelector, oOpts).data();
        }, this.api = function(traditional) {
            return new _Api(traditional ? _fnSettingsFromNode(this[_ext.iApiIndex]) : this);
        }, this.fnAddData = function(data, redraw) {
            var api = this.api(!0), rows = $.isArray(data) && ($.isArray(data[0]) || $.isPlainObject(data[0])) ? api.rows.add(data) : api.row.add(data);
            return (redraw === undefined || redraw) && api.draw(), rows.flatten().toArray();
        }, this.fnAdjustColumnSizing = function(bRedraw) {
            var api = this.api(!0).columns.adjust(), settings = api.settings()[0], scroll = settings.oScroll;
            bRedraw === undefined || bRedraw ? api.draw(!1) : "" === scroll.sX && "" === scroll.sY || _fnScrollDraw(settings);
        }, this.fnClearTable = function(bRedraw) {
            var api = this.api(!0).clear();
            (bRedraw === undefined || bRedraw) && api.draw();
        }, this.fnClose = function(nTr) {
            this.api(!0).row(nTr).child.hide();
        }, this.fnDeleteRow = function(target, callback, redraw) {
            var api = this.api(!0), rows = api.rows(target), settings = rows.settings()[0], data = settings.aoData[rows[0][0]];
            return rows.remove(), callback && callback.call(this, settings, data), (redraw === undefined || redraw) && api.draw(), 
            data;
        }, this.fnDestroy = function(remove) {
            this.api(!0).destroy(remove);
        }, this.fnDraw = function(complete) {
            this.api(!0).draw(complete);
        }, this.fnFilter = function(sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive) {
            var api = this.api(!0);
            null === iColumn || iColumn === undefined ? api.search(sInput, bRegex, bSmart, bCaseInsensitive) : api.column(iColumn).search(sInput, bRegex, bSmart, bCaseInsensitive), 
            api.draw();
        }, this.fnGetData = function(src, col) {
            var api = this.api(!0);
            if (src !== undefined) {
                var type = src.nodeName ? src.nodeName.toLowerCase() : "";
                return col !== undefined || "td" == type || "th" == type ? api.cell(src, col).data() : api.row(src).data() || null;
            }
            return api.data().toArray();
        }, this.fnGetNodes = function(iRow) {
            var api = this.api(!0);
            return iRow !== undefined ? api.row(iRow).node() : api.rows().nodes().flatten().toArray();
        }, this.fnGetPosition = function(node) {
            var api = this.api(!0), nodeName = node.nodeName.toUpperCase();
            if ("TR" == nodeName) return api.row(node).index();
            if ("TD" == nodeName || "TH" == nodeName) {
                var cell = api.cell(node).index();
                return [ cell.row, cell.columnVisible, cell.column ];
            }
            return null;
        }, this.fnIsOpen = function(nTr) {
            return this.api(!0).row(nTr).child.isShown();
        }, this.fnOpen = function(nTr, mHtml, sClass) {
            return this.api(!0).row(nTr).child(mHtml, sClass).show().child()[0];
        }, this.fnPageChange = function(mAction, bRedraw) {
            var api = this.api(!0).page(mAction);
            (bRedraw === undefined || bRedraw) && api.draw(!1);
        }, this.fnSetColumnVis = function(iCol, bShow, bRedraw) {
            var api = this.api(!0).column(iCol).visible(bShow);
            (bRedraw === undefined || bRedraw) && api.columns.adjust().draw();
        }, this.fnSettings = function() {
            return _fnSettingsFromNode(this[_ext.iApiIndex]);
        }, this.fnSort = function(aaSort) {
            this.api(!0).order(aaSort).draw();
        }, this.fnSortListener = function(nNode, iColumn, fnCallback) {
            this.api(!0).order.listener(nNode, iColumn, fnCallback);
        }, this.fnUpdate = function(mData, mRow, iColumn, bRedraw, bAction) {
            var api = this.api(!0);
            return iColumn === undefined || null === iColumn ? api.row(mRow).data(mData) : api.cell(mRow, iColumn).data(mData), 
            (bAction === undefined || bAction) && api.columns.adjust(), (bRedraw === undefined || bRedraw) && api.draw(), 
            0;
        }, this.fnVersionCheck = _ext.fnVersionCheck;
        var _that = this, emptyInit = options === undefined, len = this.length;
        emptyInit && (options = {}), this.oApi = this.internal = _ext.internal;
        for (var fn in DataTable.ext.internal) fn && (this[fn] = _fnExternApiFunc(fn));
        return this.each(function() {
            var iLen, o = {}, oInit = len > 1 ? _fnExtend(o, options, !0) : options, i = 0, sId = this.getAttribute("id"), bInitHandedOff = !1, defaults = DataTable.defaults, $this = $(this);
            if ("table" != this.nodeName.toLowerCase()) return void _fnLog(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
            _fnCompatOpts(defaults), _fnCompatCols(defaults.column), _fnCamelToHungarian(defaults, defaults, !0), 
            _fnCamelToHungarian(defaults.column, defaults.column, !0), _fnCamelToHungarian(defaults, $.extend(oInit, $this.data()));
            var allSettings = DataTable.settings;
            for (i = 0, iLen = allSettings.length; i < iLen; i++) {
                var s = allSettings[i];
                if (s.nTable == this || s.nTHead.parentNode == this || s.nTFoot && s.nTFoot.parentNode == this) {
                    var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve, bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
                    if (emptyInit || bRetrieve) return s.oInstance;
                    if (bDestroy) {
                        s.oInstance.fnDestroy();
                        break;
                    }
                    return void _fnLog(s, 0, "Cannot reinitialise DataTable", 3);
                }
                if (s.sTableId == this.id) {
                    allSettings.splice(i, 1);
                    break;
                }
            }
            null !== sId && "" !== sId || (sId = "DataTables_Table_" + DataTable.ext._unique++, 
            this.id = sId);
            var oSettings = $.extend(!0, {}, DataTable.models.oSettings, {
                sDestroyWidth: $this[0].style.width,
                sInstance: sId,
                sTableId: sId
            });
            oSettings.nTable = this, oSettings.oApi = _that.internal, oSettings.oInit = oInit, 
            allSettings.push(oSettings), oSettings.oInstance = 1 === _that.length ? _that : $this.dataTable(), 
            _fnCompatOpts(oInit), oInit.oLanguage && _fnLanguageCompat(oInit.oLanguage), oInit.aLengthMenu && !oInit.iDisplayLength && (oInit.iDisplayLength = $.isArray(oInit.aLengthMenu[0]) ? oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0]), 
            oInit = _fnExtend($.extend(!0, {}, defaults), oInit), _fnMap(oSettings.oFeatures, oInit, [ "bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender" ]), 
            _fnMap(oSettings, oInit, [ "asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", [ "iCookieDuration", "iStateDuration" ], [ "oSearch", "oPreviousSearch" ], [ "aoSearchCols", "aoPreSearchCols" ], [ "iDisplayLength", "_iDisplayLength" ], [ "bJQueryUI", "bJUI" ] ]), 
            _fnMap(oSettings.oScroll, oInit, [ [ "sScrollX", "sX" ], [ "sScrollXInner", "sXInner" ], [ "sScrollY", "sY" ], [ "bScrollCollapse", "bCollapse" ] ]), 
            _fnMap(oSettings.oLanguage, oInit, "fnInfoCallback"), _fnCallbackReg(oSettings, "aoDrawCallback", oInit.fnDrawCallback, "user"), 
            _fnCallbackReg(oSettings, "aoServerParams", oInit.fnServerParams, "user"), _fnCallbackReg(oSettings, "aoStateSaveParams", oInit.fnStateSaveParams, "user"), 
            _fnCallbackReg(oSettings, "aoStateLoadParams", oInit.fnStateLoadParams, "user"), 
            _fnCallbackReg(oSettings, "aoStateLoaded", oInit.fnStateLoaded, "user"), _fnCallbackReg(oSettings, "aoRowCallback", oInit.fnRowCallback, "user"), 
            _fnCallbackReg(oSettings, "aoRowCreatedCallback", oInit.fnCreatedRow, "user"), _fnCallbackReg(oSettings, "aoHeaderCallback", oInit.fnHeaderCallback, "user"), 
            _fnCallbackReg(oSettings, "aoFooterCallback", oInit.fnFooterCallback, "user"), _fnCallbackReg(oSettings, "aoInitComplete", oInit.fnInitComplete, "user"), 
            _fnCallbackReg(oSettings, "aoPreDrawCallback", oInit.fnPreDrawCallback, "user"), 
            oSettings.rowIdFn = _fnGetObjectDataFn(oInit.rowId), _fnBrowserDetect(oSettings);
            var oClasses = oSettings.oClasses;
            if (oInit.bJQueryUI ? ($.extend(oClasses, DataTable.ext.oJUIClasses, oInit.oClasses), 
            oInit.sDom === defaults.sDom && "lfrtip" === defaults.sDom && (oSettings.sDom = '<"H"lfr>t<"F"ip>'), 
            oSettings.renderer ? $.isPlainObject(oSettings.renderer) && !oSettings.renderer.header && (oSettings.renderer.header = "jqueryui") : oSettings.renderer = "jqueryui") : $.extend(oClasses, DataTable.ext.classes, oInit.oClasses), 
            $this.addClass(oClasses.sTable), oSettings.iInitDisplayStart === undefined && (oSettings.iInitDisplayStart = oInit.iDisplayStart, 
            oSettings._iDisplayStart = oInit.iDisplayStart), null !== oInit.iDeferLoading) {
                oSettings.bDeferLoading = !0;
                var tmp = $.isArray(oInit.iDeferLoading);
                oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading, 
                oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
            }
            var oLanguage = oSettings.oLanguage;
            $.extend(!0, oLanguage, oInit.oLanguage), "" !== oLanguage.sUrl && ($.ajax({
                dataType: "json",
                url: oLanguage.sUrl,
                success: function(json) {
                    _fnLanguageCompat(json), _fnCamelToHungarian(defaults.oLanguage, json), $.extend(!0, oLanguage, json), 
                    _fnInitialise(oSettings);
                },
                error: function() {
                    _fnInitialise(oSettings);
                }
            }), bInitHandedOff = !0), null === oInit.asStripeClasses && (oSettings.asStripeClasses = [ oClasses.sStripeOdd, oClasses.sStripeEven ]);
            var stripeClasses = oSettings.asStripeClasses, rowOne = $this.children("tbody").find("tr").eq(0);
            $.inArray(!0, $.map(stripeClasses, function(el, i) {
                return rowOne.hasClass(el);
            })) !== -1 && ($("tbody tr", this).removeClass(stripeClasses.join(" ")), oSettings.asDestroyStripes = stripeClasses.slice());
            var aoColumnsInit, anThs = [], nThead = this.getElementsByTagName("thead");
            if (0 !== nThead.length && (_fnDetectHeader(oSettings.aoHeader, nThead[0]), anThs = _fnGetUniqueThs(oSettings)), 
            null === oInit.aoColumns) for (aoColumnsInit = [], i = 0, iLen = anThs.length; i < iLen; i++) aoColumnsInit.push(null); else aoColumnsInit = oInit.aoColumns;
            for (i = 0, iLen = aoColumnsInit.length; i < iLen; i++) _fnAddColumn(oSettings, anThs ? anThs[i] : null);
            if (_fnApplyColumnDefs(oSettings, oInit.aoColumnDefs, aoColumnsInit, function(iCol, oDef) {
                _fnColumnOptions(oSettings, iCol, oDef);
            }), rowOne.length) {
                var a = function(cell, name) {
                    return null !== cell.getAttribute("data-" + name) ? name : null;
                };
                $(rowOne[0]).children("th, td").each(function(i, cell) {
                    var col = oSettings.aoColumns[i];
                    if (col.mData === i) {
                        var sort = a(cell, "sort") || a(cell, "order"), filter = a(cell, "filter") || a(cell, "search");
                        null === sort && null === filter || (col.mData = {
                            _: i + ".display",
                            sort: null !== sort ? i + ".@data-" + sort : undefined,
                            type: null !== sort ? i + ".@data-" + sort : undefined,
                            filter: null !== filter ? i + ".@data-" + filter : undefined
                        }, _fnColumnOptions(oSettings, i));
                    }
                });
            }
            var features = oSettings.oFeatures;
            if (oInit.bStateSave && (features.bStateSave = !0, _fnLoadState(oSettings, oInit), 
            _fnCallbackReg(oSettings, "aoDrawCallback", _fnSaveState, "state_save")), oInit.aaSorting === undefined) {
                var sorting = oSettings.aaSorting;
                for (i = 0, iLen = sorting.length; i < iLen; i++) sorting[i][1] = oSettings.aoColumns[i].asSorting[0];
            }
            _fnSortingClasses(oSettings), features.bSort && _fnCallbackReg(oSettings, "aoDrawCallback", function() {
                if (oSettings.bSorted) {
                    var aSort = _fnSortFlatten(oSettings), sortedColumns = {};
                    $.each(aSort, function(i, val) {
                        sortedColumns[val.src] = val.dir;
                    }), _fnCallbackFire(oSettings, null, "order", [ oSettings, aSort, sortedColumns ]), 
                    _fnSortAria(oSettings);
                }
            }), _fnCallbackReg(oSettings, "aoDrawCallback", function() {
                (oSettings.bSorted || "ssp" === _fnDataSource(oSettings) || features.bDeferRender) && _fnSortingClasses(oSettings);
            }, "sc");
            var captions = $this.children("caption").each(function() {
                this._captionSide = $this.css("caption-side");
            }), thead = $this.children("thead");
            0 === thead.length && (thead = $("<thead/>").appendTo(this)), oSettings.nTHead = thead[0];
            var tbody = $this.children("tbody");
            0 === tbody.length && (tbody = $("<tbody/>").appendTo(this)), oSettings.nTBody = tbody[0];
            var tfoot = $this.children("tfoot");
            if (0 === tfoot.length && captions.length > 0 && ("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && (tfoot = $("<tfoot/>").appendTo(this)), 
            0 === tfoot.length || 0 === tfoot.children().length ? $this.addClass(oClasses.sNoFooter) : tfoot.length > 0 && (oSettings.nTFoot = tfoot[0], 
            _fnDetectHeader(oSettings.aoFooter, oSettings.nTFoot)), oInit.aaData) for (i = 0; i < oInit.aaData.length; i++) _fnAddData(oSettings, oInit.aaData[i]); else (oSettings.bDeferLoading || "dom" == _fnDataSource(oSettings)) && _fnAddTr(oSettings, $(oSettings.nTBody).children("tr"));
            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), oSettings.bInitialised = !0, 
            bInitHandedOff === !1 && _fnInitialise(oSettings);
        }), _that = null, this;
    }, _re_dic = {}, _re_new_lines = /[\r\n]/g, _re_html = /<.*?>/g, _re_date_start = /^[\w\+\-]/, _re_date_end = /[\w\+\-]$/, _re_escape_regex = new RegExp("(\\" + [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-" ].join("|\\") + ")", "g"), _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi, _empty = function(d) {
        return !d || d === !0 || "-" === d;
    }, _intVal = function(s) {
        var integer = parseInt(s, 10);
        return !isNaN(integer) && isFinite(s) ? integer : null;
    }, _numToDecimal = function(num, decimalPoint) {
        return _re_dic[decimalPoint] || (_re_dic[decimalPoint] = new RegExp(_fnEscapeRegex(decimalPoint), "g")), 
        "string" == typeof num && "." !== decimalPoint ? num.replace(/\./g, "").replace(_re_dic[decimalPoint], ".") : num;
    }, _isNumber = function(d, decimalPoint, formatted) {
        var strType = "string" == typeof d;
        return !!_empty(d) || (decimalPoint && strType && (d = _numToDecimal(d, decimalPoint)), 
        formatted && strType && (d = d.replace(_re_formatted_numeric, "")), !isNaN(parseFloat(d)) && isFinite(d));
    }, _isHtml = function(d) {
        return _empty(d) || "string" == typeof d;
    }, _htmlNumeric = function(d, decimalPoint, formatted) {
        if (_empty(d)) return !0;
        var html = _isHtml(d);
        return html ? !!_isNumber(_stripHtml(d), decimalPoint, formatted) || null : null;
    }, _pluck = function(a, prop, prop2) {
        var out = [], i = 0, ien = a.length;
        if (prop2 !== undefined) for (;i < ien; i++) a[i] && a[i][prop] && out.push(a[i][prop][prop2]); else for (;i < ien; i++) a[i] && out.push(a[i][prop]);
        return out;
    }, _pluck_order = function(a, order, prop, prop2) {
        var out = [], i = 0, ien = order.length;
        if (prop2 !== undefined) for (;i < ien; i++) a[order[i]][prop] && out.push(a[order[i]][prop][prop2]); else for (;i < ien; i++) out.push(a[order[i]][prop]);
        return out;
    }, _range = function(len, start) {
        var end, out = [];
        start === undefined ? (start = 0, end = len) : (end = start, start = len);
        for (var i = start; i < end; i++) out.push(i);
        return out;
    }, _removeEmpty = function(a) {
        for (var out = [], i = 0, ien = a.length; i < ien; i++) a[i] && out.push(a[i]);
        return out;
    }, _stripHtml = function(d) {
        return d.replace(_re_html, "");
    }, _unique = function(src) {
        var val, i, j, out = [], ien = src.length, k = 0;
        again: for (i = 0; i < ien; i++) {
            for (val = src[i], j = 0; j < k; j++) if (out[j] === val) continue again;
            out.push(val), k++;
        }
        return out;
    };
    DataTable.util = {
        throttle: function(fn, freq) {
            var last, timer, frequency = freq !== undefined ? freq : 200;
            return function() {
                var that = this, now = +new Date(), args = arguments;
                last && now < last + frequency ? (clearTimeout(timer), timer = setTimeout(function() {
                    last = undefined, fn.apply(that, args);
                }, frequency)) : (last = now, fn.apply(that, args));
            };
        },
        escapeRegex: function(val) {
            return val.replace(_re_escape_regex, "\\$1");
        }
    };
    var _fnCompatMap = function(o, knew, old) {
        o[knew] !== undefined && (o[old] = o[knew]);
    }, __reArray = /\[.*?\]$/, __reFn = /\(\)$/, _fnEscapeRegex = DataTable.util.escapeRegex, __filter_div = $("<div>")[0], __filter_div_textContent = __filter_div.textContent !== undefined, __re_html_remove = /<.*?>/g, _fnThrottle = DataTable.util.throttle, __apiStruct = [], __arrayProto = Array.prototype, _toSettings = function(mixed) {
        var idx, jq, settings = DataTable.settings, tables = $.map(settings, function(el, i) {
            return el.nTable;
        });
        return mixed ? mixed.nTable && mixed.oApi ? [ mixed ] : mixed.nodeName && "table" === mixed.nodeName.toLowerCase() ? (idx = $.inArray(mixed, tables), 
        idx !== -1 ? [ settings[idx] ] : null) : mixed && "function" == typeof mixed.settings ? mixed.settings().toArray() : ("string" == typeof mixed ? jq = $(mixed) : mixed instanceof $ && (jq = mixed), 
        jq ? jq.map(function(i) {
            return idx = $.inArray(this, tables), idx !== -1 ? settings[idx] : null;
        }).toArray() : void 0) : [];
    };
    _Api = function(context, data) {
        if (!(this instanceof _Api)) return new _Api(context, data);
        var settings = [], ctxSettings = function(o) {
            var a = _toSettings(o);
            a && (settings = settings.concat(a));
        };
        if ($.isArray(context)) for (var i = 0, ien = context.length; i < ien; i++) ctxSettings(context[i]); else ctxSettings(context);
        this.context = _unique(settings), data && $.merge(this, data), this.selector = {
            rows: null,
            cols: null,
            opts: null
        }, _Api.extend(this, this, __apiStruct);
    }, DataTable.Api = _Api, $.extend(_Api.prototype, {
        any: function() {
            return 0 !== this.count();
        },
        concat: __arrayProto.concat,
        context: [],
        count: function() {
            return this.flatten().length;
        },
        each: function(fn) {
            for (var i = 0, ien = this.length; i < ien; i++) fn.call(this, this[i], i, this);
            return this;
        },
        eq: function(idx) {
            var ctx = this.context;
            return ctx.length > idx ? new _Api(ctx[idx], this[idx]) : null;
        },
        filter: function(fn) {
            var a = [];
            if (__arrayProto.filter) a = __arrayProto.filter.call(this, fn, this); else for (var i = 0, ien = this.length; i < ien; i++) fn.call(this, this[i], i, this) && a.push(this[i]);
            return new _Api(this.context, a);
        },
        flatten: function() {
            var a = [];
            return new _Api(this.context, a.concat.apply(a, this.toArray()));
        },
        join: __arrayProto.join,
        indexOf: __arrayProto.indexOf || function(obj, start) {
            for (var i = start || 0, ien = this.length; i < ien; i++) if (this[i] === obj) return i;
            return -1;
        },
        iterator: function(flatten, type, fn, alwaysNew) {
            var ret, i, ien, j, jen, rows, items, item, a = [], context = this.context, selector = this.selector;
            for ("string" == typeof flatten && (alwaysNew = fn, fn = type, type = flatten, flatten = !1), 
            i = 0, ien = context.length; i < ien; i++) {
                var apiInst = new _Api(context[i]);
                if ("table" === type) ret = fn.call(apiInst, context[i], i), ret !== undefined && a.push(ret); else if ("columns" === type || "rows" === type) ret = fn.call(apiInst, context[i], this[i], i), 
                ret !== undefined && a.push(ret); else if ("column" === type || "column-rows" === type || "row" === type || "cell" === type) for (items = this[i], 
                "column-rows" === type && (rows = _selector_row_indexes(context[i], selector.opts)), 
                j = 0, jen = items.length; j < jen; j++) item = items[j], ret = "cell" === type ? fn.call(apiInst, context[i], item.row, item.column, i, j) : fn.call(apiInst, context[i], item, i, j, rows), 
                ret !== undefined && a.push(ret);
            }
            if (a.length || alwaysNew) {
                var api = new _Api(context, flatten ? a.concat.apply([], a) : a), apiSelector = api.selector;
                return apiSelector.rows = selector.rows, apiSelector.cols = selector.cols, apiSelector.opts = selector.opts, 
                api;
            }
            return this;
        },
        lastIndexOf: __arrayProto.lastIndexOf || function(obj, start) {
            return this.indexOf.apply(this.toArray.reverse(), arguments);
        },
        length: 0,
        map: function(fn) {
            var a = [];
            if (__arrayProto.map) a = __arrayProto.map.call(this, fn, this); else for (var i = 0, ien = this.length; i < ien; i++) a.push(fn.call(this, this[i], i));
            return new _Api(this.context, a);
        },
        pluck: function(prop) {
            return this.map(function(el) {
                return el[prop];
            });
        },
        pop: __arrayProto.pop,
        push: __arrayProto.push,
        reduce: __arrayProto.reduce || function(fn, init) {
            return _fnReduce(this, fn, init, 0, this.length, 1);
        },
        reduceRight: __arrayProto.reduceRight || function(fn, init) {
            return _fnReduce(this, fn, init, this.length - 1, -1, -1);
        },
        reverse: __arrayProto.reverse,
        selector: null,
        shift: __arrayProto.shift,
        sort: __arrayProto.sort,
        splice: __arrayProto.splice,
        toArray: function() {
            return __arrayProto.slice.call(this);
        },
        to$: function() {
            return $(this);
        },
        toJQuery: function() {
            return $(this);
        },
        unique: function() {
            return new _Api(this.context, _unique(this));
        },
        unshift: __arrayProto.unshift
    }), _Api.extend = function(scope, obj, ext) {
        if (ext.length && obj && (obj instanceof _Api || obj.__dt_wrapper)) {
            var i, ien, struct, methodScoping = function(scope, fn, struc) {
                return function() {
                    var ret = fn.apply(scope, arguments);
                    return _Api.extend(ret, ret, struc.methodExt), ret;
                };
            };
            for (i = 0, ien = ext.length; i < ien; i++) struct = ext[i], obj[struct.name] = "function" == typeof struct.val ? methodScoping(scope, struct.val, struct) : $.isPlainObject(struct.val) ? {} : struct.val, 
            obj[struct.name].__dt_wrapper = !0, _Api.extend(scope, obj[struct.name], struct.propExt);
        }
    }, _Api.register = _api_register = function(name, val) {
        if ($.isArray(name)) for (var j = 0, jen = name.length; j < jen; j++) _Api.register(name[j], val); else {
            var i, ien, key, method, heir = name.split("."), struct = __apiStruct, find = function(src, name) {
                for (var i = 0, ien = src.length; i < ien; i++) if (src[i].name === name) return src[i];
                return null;
            };
            for (i = 0, ien = heir.length; i < ien; i++) {
                method = heir[i].indexOf("()") !== -1, key = method ? heir[i].replace("()", "") : heir[i];
                var src = find(struct, key);
                src || (src = {
                    name: key,
                    val: {},
                    methodExt: [],
                    propExt: []
                }, struct.push(src)), i === ien - 1 ? src.val = val : struct = method ? src.methodExt : src.propExt;
            }
        }
    }, _Api.registerPlural = _api_registerPlural = function(pluralName, singularName, val) {
        _Api.register(pluralName, val), _Api.register(singularName, function() {
            var ret = val.apply(this, arguments);
            return ret === this ? this : ret instanceof _Api ? ret.length ? $.isArray(ret[0]) ? new _Api(ret.context, ret[0]) : ret[0] : undefined : ret;
        });
    };
    var __table_selector = function(selector, a) {
        if ("number" == typeof selector) return [ a[selector] ];
        var nodes = $.map(a, function(el, i) {
            return el.nTable;
        });
        return $(nodes).filter(selector).map(function(i) {
            var idx = $.inArray(this, nodes);
            return a[idx];
        }).toArray();
    };
    _api_register("tables()", function(selector) {
        return selector ? new _Api(__table_selector(selector, this.context)) : this;
    }), _api_register("table()", function(selector) {
        var tables = this.tables(selector), ctx = tables.context;
        return ctx.length ? new _Api(ctx[0]) : tables;
    }), _api_registerPlural("tables().nodes()", "table().node()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTable;
        }, 1);
    }), _api_registerPlural("tables().body()", "table().body()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTBody;
        }, 1);
    }), _api_registerPlural("tables().header()", "table().header()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTHead;
        }, 1);
    }), _api_registerPlural("tables().footer()", "table().footer()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTFoot;
        }, 1);
    }), _api_registerPlural("tables().containers()", "table().container()", function() {
        return this.iterator("table", function(ctx) {
            return ctx.nTableWrapper;
        }, 1);
    }), _api_register("draw()", function(paging) {
        return this.iterator("table", function(settings) {
            "page" === paging ? _fnDraw(settings) : ("string" == typeof paging && (paging = "full-hold" !== paging), 
            _fnReDraw(settings, paging === !1));
        });
    }), _api_register("page()", function(action) {
        return action === undefined ? this.page.info().page : this.iterator("table", function(settings) {
            _fnPageChange(settings, action);
        });
    }), _api_register("page.info()", function(action) {
        if (0 === this.context.length) return undefined;
        var settings = this.context[0], start = settings._iDisplayStart, len = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1, visRecords = settings.fnRecordsDisplay(), all = len === -1;
        return {
            page: all ? 0 : Math.floor(start / len),
            pages: all ? 1 : Math.ceil(visRecords / len),
            start: start,
            end: settings.fnDisplayEnd(),
            length: len,
            recordsTotal: settings.fnRecordsTotal(),
            recordsDisplay: visRecords,
            serverSide: "ssp" === _fnDataSource(settings)
        };
    }), _api_register("page.len()", function(len) {
        return len === undefined ? 0 !== this.context.length ? this.context[0]._iDisplayLength : undefined : this.iterator("table", function(settings) {
            _fnLengthChange(settings, len);
        });
    });
    var __reload = function(settings, holdPosition, callback) {
        if (callback) {
            var api = new _Api(settings);
            api.one("draw", function() {
                callback(api.ajax.json());
            });
        }
        if ("ssp" == _fnDataSource(settings)) _fnReDraw(settings, holdPosition); else {
            _fnProcessingDisplay(settings, !0);
            var xhr = settings.jqXHR;
            xhr && 4 !== xhr.readyState && xhr.abort(), _fnBuildAjax(settings, [], function(json) {
                _fnClearTable(settings);
                for (var data = _fnAjaxDataSrc(settings, json), i = 0, ien = data.length; i < ien; i++) _fnAddData(settings, data[i]);
                _fnReDraw(settings, holdPosition), _fnProcessingDisplay(settings, !1);
            });
        }
    };
    _api_register("ajax.json()", function() {
        var ctx = this.context;
        if (ctx.length > 0) return ctx[0].json;
    }), _api_register("ajax.params()", function() {
        var ctx = this.context;
        if (ctx.length > 0) return ctx[0].oAjaxData;
    }), _api_register("ajax.reload()", function(callback, resetPaging) {
        return this.iterator("table", function(settings) {
            __reload(settings, resetPaging === !1, callback);
        });
    }), _api_register("ajax.url()", function(url) {
        var ctx = this.context;
        return url === undefined ? 0 === ctx.length ? undefined : (ctx = ctx[0], ctx.ajax ? $.isPlainObject(ctx.ajax) ? ctx.ajax.url : ctx.ajax : ctx.sAjaxSource) : this.iterator("table", function(settings) {
            $.isPlainObject(settings.ajax) ? settings.ajax.url = url : settings.ajax = url;
        });
    }), _api_register("ajax.url().load()", function(callback, resetPaging) {
        return this.iterator("table", function(ctx) {
            __reload(ctx, resetPaging === !1, callback);
        });
    });
    var _selector_run = function(type, selector, selectFn, settings, opts) {
        var res, a, i, ien, j, jen, out = [], selectorType = typeof selector;
        for (selector && "string" !== selectorType && "function" !== selectorType && selector.length !== undefined || (selector = [ selector ]), 
        i = 0, ien = selector.length; i < ien; i++) for (a = selector[i] && selector[i].split ? selector[i].split(",") : [ selector[i] ], 
        j = 0, jen = a.length; j < jen; j++) res = selectFn("string" == typeof a[j] ? $.trim(a[j]) : a[j]), 
        res && res.length && (out = out.concat(res));
        var ext = _ext.selector[type];
        if (ext.length) for (i = 0, ien = ext.length; i < ien; i++) out = ext[i](settings, opts, out);
        return _unique(out);
    }, _selector_opts = function(opts) {
        return opts || (opts = {}), opts.filter && opts.search === undefined && (opts.search = opts.filter), 
        $.extend({
            search: "none",
            order: "current",
            page: "all"
        }, opts);
    }, _selector_first = function(inst) {
        for (var i = 0, ien = inst.length; i < ien; i++) if (inst[i].length > 0) return inst[0] = inst[i], 
        inst[0].length = 1, inst.length = 1, inst.context = [ inst.context[i] ], inst;
        return inst.length = 0, inst;
    }, _selector_row_indexes = function(settings, opts) {
        var i, ien, tmp, a = [], displayFiltered = settings.aiDisplay, displayMaster = settings.aiDisplayMaster, search = opts.search, order = opts.order, page = opts.page;
        if ("ssp" == _fnDataSource(settings)) return "removed" === search ? [] : _range(0, displayMaster.length);
        if ("current" == page) for (i = settings._iDisplayStart, ien = settings.fnDisplayEnd(); i < ien; i++) a.push(displayFiltered[i]); else if ("current" == order || "applied" == order) a = "none" == search ? displayMaster.slice() : "applied" == search ? displayFiltered.slice() : $.map(displayMaster, function(el, i) {
            return $.inArray(el, displayFiltered) === -1 ? el : null;
        }); else if ("index" == order || "original" == order) for (i = 0, ien = settings.aoData.length; i < ien; i++) "none" == search ? a.push(i) : (tmp = $.inArray(i, displayFiltered), 
        (tmp === -1 && "removed" == search || tmp >= 0 && "applied" == search) && a.push(i));
        return a;
    }, __row_selector = function(settings, selector, opts) {
        var run = function(sel) {
            var selInt = _intVal(sel);
            if (null !== selInt && !opts) return [ selInt ];
            var rows = _selector_row_indexes(settings, opts);
            if (null !== selInt && $.inArray(selInt, rows) !== -1) return [ selInt ];
            if (!sel) return rows;
            if ("function" == typeof sel) return $.map(rows, function(idx) {
                var row = settings.aoData[idx];
                return sel(idx, row._aData, row.nTr) ? idx : null;
            });
            var nodes = _removeEmpty(_pluck_order(settings.aoData, rows, "nTr"));
            if (sel.nodeName) {
                if (sel._DT_RowIndex !== undefined) return [ sel._DT_RowIndex ];
                if (sel._DT_CellIndex) return [ sel._DT_CellIndex.row ];
                var host = $(sel).closest("*[data-dt-row]");
                return host.length ? [ host.data("dt-row") ] : [];
            }
            if ("string" == typeof sel && "#" === sel.charAt(0)) {
                var rowObj = settings.aIds[sel.replace(/^#/, "")];
                if (rowObj !== undefined) return [ rowObj.idx ];
            }
            return $(nodes).filter(sel).map(function() {
                return this._DT_RowIndex;
            }).toArray();
        };
        return _selector_run("row", selector, run, settings, opts);
    };
    _api_register("rows()", function(selector, opts) {
        selector === undefined ? selector = "" : $.isPlainObject(selector) && (opts = selector, 
        selector = ""), opts = _selector_opts(opts);
        var inst = this.iterator("table", function(settings) {
            return __row_selector(settings, selector, opts);
        }, 1);
        return inst.selector.rows = selector, inst.selector.opts = opts, inst;
    }), _api_register("rows().nodes()", function() {
        return this.iterator("row", function(settings, row) {
            return settings.aoData[row].nTr || undefined;
        }, 1);
    }), _api_register("rows().data()", function() {
        return this.iterator(!0, "rows", function(settings, rows) {
            return _pluck_order(settings.aoData, rows, "_aData");
        }, 1);
    }), _api_registerPlural("rows().cache()", "row().cache()", function(type) {
        return this.iterator("row", function(settings, row) {
            var r = settings.aoData[row];
            return "search" === type ? r._aFilterData : r._aSortData;
        }, 1);
    }), _api_registerPlural("rows().invalidate()", "row().invalidate()", function(src) {
        return this.iterator("row", function(settings, row) {
            _fnInvalidate(settings, row, src);
        });
    }), _api_registerPlural("rows().indexes()", "row().index()", function() {
        return this.iterator("row", function(settings, row) {
            return row;
        }, 1);
    }), _api_registerPlural("rows().ids()", "row().id()", function(hash) {
        for (var a = [], context = this.context, i = 0, ien = context.length; i < ien; i++) for (var j = 0, jen = this[i].length; j < jen; j++) {
            var id = context[i].rowIdFn(context[i].aoData[this[i][j]]._aData);
            a.push((hash === !0 ? "#" : "") + id);
        }
        return new _Api(context, a);
    }), _api_registerPlural("rows().remove()", "row().remove()", function() {
        var that = this;
        return this.iterator("row", function(settings, row, thatIdx) {
            var i, ien, j, jen, loopRow, loopCells, data = settings.aoData, rowData = data[row];
            for (data.splice(row, 1), i = 0, ien = data.length; i < ien; i++) if (loopRow = data[i], 
            loopCells = loopRow.anCells, null !== loopRow.nTr && (loopRow.nTr._DT_RowIndex = i), 
            null !== loopCells) for (j = 0, jen = loopCells.length; j < jen; j++) loopCells[j]._DT_CellIndex.row = i;
            _fnDeleteIndex(settings.aiDisplayMaster, row), _fnDeleteIndex(settings.aiDisplay, row), 
            _fnDeleteIndex(that[thatIdx], row, !1), _fnLengthOverflow(settings);
            var id = settings.rowIdFn(rowData._aData);
            id !== undefined && delete settings.aIds[id];
        }), this.iterator("table", function(settings) {
            for (var i = 0, ien = settings.aoData.length; i < ien; i++) settings.aoData[i].idx = i;
        }), this;
    }), _api_register("rows.add()", function(rows) {
        var newRows = this.iterator("table", function(settings) {
            var row, i, ien, out = [];
            for (i = 0, ien = rows.length; i < ien; i++) row = rows[i], row.nodeName && "TR" === row.nodeName.toUpperCase() ? out.push(_fnAddTr(settings, row)[0]) : out.push(_fnAddData(settings, row));
            return out;
        }, 1), modRows = this.rows(-1);
        return modRows.pop(), $.merge(modRows, newRows), modRows;
    }), _api_register("row()", function(selector, opts) {
        return _selector_first(this.rows(selector, opts));
    }), _api_register("row().data()", function(data) {
        var ctx = this.context;
        return data === undefined ? ctx.length && this.length ? ctx[0].aoData[this[0]]._aData : undefined : (ctx[0].aoData[this[0]]._aData = data, 
        _fnInvalidate(ctx[0], this[0], "data"), this);
    }), _api_register("row().node()", function() {
        var ctx = this.context;
        return ctx.length && this.length ? ctx[0].aoData[this[0]].nTr || null : null;
    }), _api_register("row.add()", function(row) {
        row instanceof $ && row.length && (row = row[0]);
        var rows = this.iterator("table", function(settings) {
            return row.nodeName && "TR" === row.nodeName.toUpperCase() ? _fnAddTr(settings, row)[0] : _fnAddData(settings, row);
        });
        return this.row(rows[0]);
    });
    var __details_add = function(ctx, row, data, klass) {
        var rows = [], addRow = function(r, k) {
            if ($.isArray(r) || r instanceof $) for (var i = 0, ien = r.length; i < ien; i++) addRow(r[i], k); else if (r.nodeName && "tr" === r.nodeName.toLowerCase()) rows.push(r); else {
                var created = $("<tr><td/></tr>").addClass(k);
                $("td", created).addClass(k).html(r)[0].colSpan = _fnVisbleColumns(ctx), rows.push(created[0]);
            }
        };
        addRow(data, klass), row._details && row._details.remove(), row._details = $(rows), 
        row._detailsShow && row._details.insertAfter(row.nTr);
    }, __details_remove = function(api, idx) {
        var ctx = api.context;
        if (ctx.length) {
            var row = ctx[0].aoData[idx !== undefined ? idx : api[0]];
            row && row._details && (row._details.remove(), row._detailsShow = undefined, row._details = undefined);
        }
    }, __details_display = function(api, show) {
        var ctx = api.context;
        if (ctx.length && api.length) {
            var row = ctx[0].aoData[api[0]];
            row._details && (row._detailsShow = show, show ? row._details.insertAfter(row.nTr) : row._details.detach(), 
            __details_events(ctx[0]));
        }
    }, __details_events = function(settings) {
        var api = new _Api(settings), namespace = ".dt.DT_details", drawEvent = "draw" + namespace, colvisEvent = "column-visibility" + namespace, destroyEvent = "destroy" + namespace, data = settings.aoData;
        api.off(drawEvent + " " + colvisEvent + " " + destroyEvent), _pluck(data, "_details").length > 0 && (api.on(drawEvent, function(e, ctx) {
            settings === ctx && api.rows({
                page: "current"
            }).eq(0).each(function(idx) {
                var row = data[idx];
                row._detailsShow && row._details.insertAfter(row.nTr);
            });
        }), api.on(colvisEvent, function(e, ctx, idx, vis) {
            if (settings === ctx) for (var row, visible = _fnVisbleColumns(ctx), i = 0, ien = data.length; i < ien; i++) row = data[i], 
            row._details && row._details.children("td[colspan]").attr("colspan", visible);
        }), api.on(destroyEvent, function(e, ctx) {
            if (settings === ctx) for (var i = 0, ien = data.length; i < ien; i++) data[i]._details && __details_remove(api, i);
        }));
    }, _emp = "", _child_obj = _emp + "row().child", _child_mth = _child_obj + "()";
    _api_register(_child_mth, function(data, klass) {
        var ctx = this.context;
        return data === undefined ? ctx.length && this.length ? ctx[0].aoData[this[0]]._details : undefined : (data === !0 ? this.child.show() : data === !1 ? __details_remove(this) : ctx.length && this.length && __details_add(ctx[0], ctx[0].aoData[this[0]], data, klass), 
        this);
    }), _api_register([ _child_obj + ".show()", _child_mth + ".show()" ], function(show) {
        return __details_display(this, !0), this;
    }), _api_register([ _child_obj + ".hide()", _child_mth + ".hide()" ], function() {
        return __details_display(this, !1), this;
    }), _api_register([ _child_obj + ".remove()", _child_mth + ".remove()" ], function() {
        return __details_remove(this), this;
    }), _api_register(_child_obj + ".isShown()", function() {
        var ctx = this.context;
        return !(!ctx.length || !this.length) && (ctx[0].aoData[this[0]]._detailsShow || !1);
    });
    var __re_column_selector = /^(.+):(name|visIdx|visible)$/, __columnData = function(settings, column, r1, r2, rows) {
        for (var a = [], row = 0, ien = rows.length; row < ien; row++) a.push(_fnGetCellData(settings, rows[row], column));
        return a;
    }, __column_selector = function(settings, selector, opts) {
        var columns = settings.aoColumns, names = _pluck(columns, "sName"), nodes = _pluck(columns, "nTh"), run = function(s) {
            var selInt = _intVal(s);
            if ("" === s) return _range(columns.length);
            if (null !== selInt) return [ selInt >= 0 ? selInt : columns.length + selInt ];
            if ("function" == typeof s) {
                var rows = _selector_row_indexes(settings, opts);
                return $.map(columns, function(col, idx) {
                    return s(idx, __columnData(settings, idx, 0, 0, rows), nodes[idx]) ? idx : null;
                });
            }
            var match = "string" == typeof s ? s.match(__re_column_selector) : "";
            if (match) switch (match[2]) {
              case "visIdx":
              case "visible":
                var idx = parseInt(match[1], 10);
                if (idx < 0) {
                    var visColumns = $.map(columns, function(col, i) {
                        return col.bVisible ? i : null;
                    });
                    return [ visColumns[visColumns.length + idx] ];
                }
                return [ _fnVisibleToColumnIndex(settings, idx) ];

              case "name":
                return $.map(names, function(name, i) {
                    return name === match[1] ? i : null;
                });

              default:
                return [];
            }
            if (s.nodeName && s._DT_CellIndex) return [ s._DT_CellIndex.column ];
            var jqResult = $(nodes).filter(s).map(function() {
                return $.inArray(this, nodes);
            }).toArray();
            if (jqResult.length || !s.nodeName) return jqResult;
            var host = $(s).closest("*[data-dt-column]");
            return host.length ? [ host.data("dt-column") ] : [];
        };
        return _selector_run("column", selector, run, settings, opts);
    }, __setColumnVis = function(settings, column, vis) {
        var cells, i, ien, tr, cols = settings.aoColumns, col = cols[column], data = settings.aoData;
        if (vis === undefined) return col.bVisible;
        if (col.bVisible !== vis) {
            if (vis) {
                var insertBefore = $.inArray(!0, _pluck(cols, "bVisible"), column + 1);
                for (i = 0, ien = data.length; i < ien; i++) tr = data[i].nTr, cells = data[i].anCells, 
                tr && tr.insertBefore(cells[column], cells[insertBefore] || null);
            } else $(_pluck(settings.aoData, "anCells", column)).detach();
            col.bVisible = vis, _fnDrawHead(settings, settings.aoHeader), _fnDrawHead(settings, settings.aoFooter), 
            _fnSaveState(settings);
        }
    };
    _api_register("columns()", function(selector, opts) {
        selector === undefined ? selector = "" : $.isPlainObject(selector) && (opts = selector, 
        selector = ""), opts = _selector_opts(opts);
        var inst = this.iterator("table", function(settings) {
            return __column_selector(settings, selector, opts);
        }, 1);
        return inst.selector.cols = selector, inst.selector.opts = opts, inst;
    }), _api_registerPlural("columns().header()", "column().header()", function(selector, opts) {
        return this.iterator("column", function(settings, column) {
            return settings.aoColumns[column].nTh;
        }, 1);
    }), _api_registerPlural("columns().footer()", "column().footer()", function(selector, opts) {
        return this.iterator("column", function(settings, column) {
            return settings.aoColumns[column].nTf;
        }, 1);
    }), _api_registerPlural("columns().data()", "column().data()", function() {
        return this.iterator("column-rows", __columnData, 1);
    }), _api_registerPlural("columns().dataSrc()", "column().dataSrc()", function() {
        return this.iterator("column", function(settings, column) {
            return settings.aoColumns[column].mData;
        }, 1);
    }), _api_registerPlural("columns().cache()", "column().cache()", function(type) {
        return this.iterator("column-rows", function(settings, column, i, j, rows) {
            return _pluck_order(settings.aoData, rows, "search" === type ? "_aFilterData" : "_aSortData", column);
        }, 1);
    }), _api_registerPlural("columns().nodes()", "column().nodes()", function() {
        return this.iterator("column-rows", function(settings, column, i, j, rows) {
            return _pluck_order(settings.aoData, rows, "anCells", column);
        }, 1);
    }), _api_registerPlural("columns().visible()", "column().visible()", function(vis, calc) {
        var ret = this.iterator("column", function(settings, column) {
            return vis === undefined ? settings.aoColumns[column].bVisible : void __setColumnVis(settings, column, vis);
        });
        return vis !== undefined && (this.iterator("column", function(settings, column) {
            _fnCallbackFire(settings, null, "column-visibility", [ settings, column, vis, calc ]);
        }), (calc === undefined || calc) && this.columns.adjust()), ret;
    }), _api_registerPlural("columns().indexes()", "column().index()", function(type) {
        return this.iterator("column", function(settings, column) {
            return "visible" === type ? _fnColumnIndexToVisible(settings, column) : column;
        }, 1);
    }), _api_register("columns.adjust()", function() {
        return this.iterator("table", function(settings) {
            _fnAdjustColumnSizing(settings);
        }, 1);
    }), _api_register("column.index()", function(type, idx) {
        if (0 !== this.context.length) {
            var ctx = this.context[0];
            if ("fromVisible" === type || "toData" === type) return _fnVisibleToColumnIndex(ctx, idx);
            if ("fromData" === type || "toVisible" === type) return _fnColumnIndexToVisible(ctx, idx);
        }
    }), _api_register("column()", function(selector, opts) {
        return _selector_first(this.columns(selector, opts));
    });
    var __cell_selector = function(settings, selector, opts) {
        var row, a, i, ien, j, o, host, data = settings.aoData, rows = _selector_row_indexes(settings, opts), cells = _removeEmpty(_pluck_order(data, rows, "anCells")), allCells = $([].concat.apply([], cells)), columns = settings.aoColumns.length, run = function(s) {
            var fnSelector = "function" == typeof s;
            if (null === s || s === undefined || fnSelector) {
                for (a = [], i = 0, ien = rows.length; i < ien; i++) for (row = rows[i], j = 0; j < columns; j++) o = {
                    row: row,
                    column: j
                }, fnSelector ? (host = data[row], s(o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null) && a.push(o)) : a.push(o);
                return a;
            }
            if ($.isPlainObject(s)) return [ s ];
            var jqResult = allCells.filter(s).map(function(i, el) {
                return {
                    row: el._DT_CellIndex.row,
                    column: el._DT_CellIndex.column
                };
            }).toArray();
            return jqResult.length || !s.nodeName ? jqResult : (host = $(s).closest("*[data-dt-row]"), 
            host.length ? [ {
                row: host.data("dt-row"),
                column: host.data("dt-column")
            } ] : []);
        };
        return _selector_run("cell", selector, run, settings, opts);
    };
    _api_register("cells()", function(rowSelector, columnSelector, opts) {
        if ($.isPlainObject(rowSelector) && (rowSelector.row === undefined ? (opts = rowSelector, 
        rowSelector = null) : (opts = columnSelector, columnSelector = null)), $.isPlainObject(columnSelector) && (opts = columnSelector, 
        columnSelector = null), null === columnSelector || columnSelector === undefined) return this.iterator("table", function(settings) {
            return __cell_selector(settings, rowSelector, _selector_opts(opts));
        });
        var a, i, ien, j, jen, columns = this.columns(columnSelector, opts), rows = this.rows(rowSelector, opts), cells = this.iterator("table", function(settings, idx) {
            for (a = [], i = 0, ien = rows[idx].length; i < ien; i++) for (j = 0, jen = columns[idx].length; j < jen; j++) a.push({
                row: rows[idx][i],
                column: columns[idx][j]
            });
            return a;
        }, 1);
        return $.extend(cells.selector, {
            cols: columnSelector,
            rows: rowSelector,
            opts: opts
        }), cells;
    }), _api_registerPlural("cells().nodes()", "cell().node()", function() {
        return this.iterator("cell", function(settings, row, column) {
            var data = settings.aoData[row];
            return data && data.anCells ? data.anCells[column] : undefined;
        }, 1);
    }), _api_register("cells().data()", function() {
        return this.iterator("cell", function(settings, row, column) {
            return _fnGetCellData(settings, row, column);
        }, 1);
    }), _api_registerPlural("cells().cache()", "cell().cache()", function(type) {
        return type = "search" === type ? "_aFilterData" : "_aSortData", this.iterator("cell", function(settings, row, column) {
            return settings.aoData[row][type][column];
        }, 1);
    }), _api_registerPlural("cells().render()", "cell().render()", function(type) {
        return this.iterator("cell", function(settings, row, column) {
            return _fnGetCellData(settings, row, column, type);
        }, 1);
    }), _api_registerPlural("cells().indexes()", "cell().index()", function() {
        return this.iterator("cell", function(settings, row, column) {
            return {
                row: row,
                column: column,
                columnVisible: _fnColumnIndexToVisible(settings, column)
            };
        }, 1);
    }), _api_registerPlural("cells().invalidate()", "cell().invalidate()", function(src) {
        return this.iterator("cell", function(settings, row, column) {
            _fnInvalidate(settings, row, src, column);
        });
    }), _api_register("cell()", function(rowSelector, columnSelector, opts) {
        return _selector_first(this.cells(rowSelector, columnSelector, opts));
    }), _api_register("cell().data()", function(data) {
        var ctx = this.context, cell = this[0];
        return data === undefined ? ctx.length && cell.length ? _fnGetCellData(ctx[0], cell[0].row, cell[0].column) : undefined : (_fnSetCellData(ctx[0], cell[0].row, cell[0].column, data), 
        _fnInvalidate(ctx[0], cell[0].row, "data", cell[0].column), this);
    }), _api_register("order()", function(order, dir) {
        var ctx = this.context;
        return order === undefined ? 0 !== ctx.length ? ctx[0].aaSorting : undefined : ("number" == typeof order ? order = [ [ order, dir ] ] : order.length && !$.isArray(order[0]) && (order = Array.prototype.slice.call(arguments)), 
        this.iterator("table", function(settings) {
            settings.aaSorting = order.slice();
        }));
    }), _api_register("order.listener()", function(node, column, callback) {
        return this.iterator("table", function(settings) {
            _fnSortAttachListener(settings, node, column, callback);
        });
    }), _api_register("order.fixed()", function(set) {
        if (!set) {
            var ctx = this.context, fixed = ctx.length ? ctx[0].aaSortingFixed : undefined;
            return $.isArray(fixed) ? {
                pre: fixed
            } : fixed;
        }
        return this.iterator("table", function(settings) {
            settings.aaSortingFixed = $.extend(!0, {}, set);
        });
    }), _api_register([ "columns().order()", "column().order()" ], function(dir) {
        var that = this;
        return this.iterator("table", function(settings, i) {
            var sort = [];
            $.each(that[i], function(j, col) {
                sort.push([ col, dir ]);
            }), settings.aaSorting = sort;
        });
    }), _api_register("search()", function(input, regex, smart, caseInsen) {
        var ctx = this.context;
        return input === undefined ? 0 !== ctx.length ? ctx[0].oPreviousSearch.sSearch : undefined : this.iterator("table", function(settings) {
            settings.oFeatures.bFilter && _fnFilterComplete(settings, $.extend({}, settings.oPreviousSearch, {
                sSearch: input + "",
                bRegex: null !== regex && regex,
                bSmart: null === smart || smart,
                bCaseInsensitive: null === caseInsen || caseInsen
            }), 1);
        });
    }), _api_registerPlural("columns().search()", "column().search()", function(input, regex, smart, caseInsen) {
        return this.iterator("column", function(settings, column) {
            var preSearch = settings.aoPreSearchCols;
            return input === undefined ? preSearch[column].sSearch : void (settings.oFeatures.bFilter && ($.extend(preSearch[column], {
                sSearch: input + "",
                bRegex: null !== regex && regex,
                bSmart: null === smart || smart,
                bCaseInsensitive: null === caseInsen || caseInsen
            }), _fnFilterComplete(settings, settings.oPreviousSearch, 1)));
        });
    }), _api_register("state()", function() {
        return this.context.length ? this.context[0].oSavedState : null;
    }), _api_register("state.clear()", function() {
        return this.iterator("table", function(settings) {
            settings.fnStateSaveCallback.call(settings.oInstance, settings, {});
        });
    }), _api_register("state.loaded()", function() {
        return this.context.length ? this.context[0].oLoadedState : null;
    }), _api_register("state.save()", function() {
        return this.iterator("table", function(settings) {
            _fnSaveState(settings);
        });
    }), DataTable.versionCheck = DataTable.fnVersionCheck = function(version) {
        for (var iThis, iThat, aThis = DataTable.version.split("."), aThat = version.split("."), i = 0, iLen = aThat.length; i < iLen; i++) if (iThis = parseInt(aThis[i], 10) || 0, 
        iThat = parseInt(aThat[i], 10) || 0, iThis !== iThat) return iThis > iThat;
        return !0;
    }, DataTable.isDataTable = DataTable.fnIsDataTable = function(table) {
        var t = $(table).get(0), is = !1;
        return $.each(DataTable.settings, function(i, o) {
            var head = o.nScrollHead ? $("table", o.nScrollHead)[0] : null, foot = o.nScrollFoot ? $("table", o.nScrollFoot)[0] : null;
            o.nTable !== t && head !== t && foot !== t || (is = !0);
        }), is;
    }, DataTable.tables = DataTable.fnTables = function(visible) {
        var api = !1;
        $.isPlainObject(visible) && (api = visible.api, visible = visible.visible);
        var a = $.map(DataTable.settings, function(o) {
            if (!visible || visible && $(o.nTable).is(":visible")) return o.nTable;
        });
        return api ? new _Api(a) : a;
    }, DataTable.camelToHungarian = _fnCamelToHungarian, _api_register("$()", function(selector, opts) {
        var rows = this.rows(opts).nodes(), jqRows = $(rows);
        return $([].concat(jqRows.filter(selector).toArray(), jqRows.find(selector).toArray()));
    }), $.each([ "on", "one", "off" ], function(i, key) {
        _api_register(key + "()", function() {
            var args = Array.prototype.slice.call(arguments);
            args[0].match(/\.dt\b/) || (args[0] += ".dt");
            var inst = $(this.tables().nodes());
            return inst[key].apply(inst, args), this;
        });
    }), _api_register("clear()", function() {
        return this.iterator("table", function(settings) {
            _fnClearTable(settings);
        });
    }), _api_register("settings()", function() {
        return new _Api(this.context, this.context);
    }), _api_register("init()", function() {
        var ctx = this.context;
        return ctx.length ? ctx[0].oInit : null;
    }), _api_register("data()", function() {
        return this.iterator("table", function(settings) {
            return _pluck(settings.aoData, "_aData");
        }).flatten();
    }), _api_register("destroy()", function(remove) {
        return remove = remove || !1, this.iterator("table", function(settings) {
            var ien, orig = settings.nTableWrapper.parentNode, classes = settings.oClasses, table = settings.nTable, tbody = settings.nTBody, thead = settings.nTHead, tfoot = settings.nTFoot, jqTable = $(table), jqTbody = $(tbody), jqWrapper = $(settings.nTableWrapper), rows = $.map(settings.aoData, function(r) {
                return r.nTr;
            });
            settings.bDestroying = !0, _fnCallbackFire(settings, "aoDestroyCallback", "destroy", [ settings ]), 
            remove || new _Api(settings).columns().visible(!0), jqWrapper.unbind(".DT").find(":not(tbody *)").unbind(".DT"), 
            $(window).unbind(".DT-" + settings.sInstance), table != thead.parentNode && (jqTable.children("thead").detach(), 
            jqTable.append(thead)), tfoot && table != tfoot.parentNode && (jqTable.children("tfoot").detach(), 
            jqTable.append(tfoot)), settings.aaSorting = [], settings.aaSortingFixed = [], _fnSortingClasses(settings), 
            $(rows).removeClass(settings.asStripeClasses.join(" ")), $("th, td", thead).removeClass(classes.sSortable + " " + classes.sSortableAsc + " " + classes.sSortableDesc + " " + classes.sSortableNone), 
            settings.bJUI && ($("th span." + classes.sSortIcon + ", td span." + classes.sSortIcon, thead).detach(), 
            $("th, td", thead).each(function() {
                var wrapper = $("div." + classes.sSortJUIWrapper, this);
                $(this).append(wrapper.contents()), wrapper.detach();
            })), jqTbody.children().detach(), jqTbody.append(rows);
            var removedMethod = remove ? "remove" : "detach";
            jqTable[removedMethod](), jqWrapper[removedMethod](), !remove && orig && (orig.insertBefore(table, settings.nTableReinsertBefore), 
            jqTable.css("width", settings.sDestroyWidth).removeClass(classes.sTable), ien = settings.asDestroyStripes.length, 
            ien && jqTbody.children().each(function(i) {
                $(this).addClass(settings.asDestroyStripes[i % ien]);
            }));
            var idx = $.inArray(settings, DataTable.settings);
            idx !== -1 && DataTable.settings.splice(idx, 1);
        });
    }), $.each([ "column", "row", "cell" ], function(i, type) {
        _api_register(type + "s().every()", function(fn) {
            var opts = this.selector.opts, api = this;
            return this.iterator(type, function(settings, arg1, arg2, arg3, arg4) {
                fn.call(api[type](arg1, "cell" === type ? arg2 : opts, "cell" === type ? opts : undefined), arg1, arg2, arg3, arg4);
            });
        });
    }), _api_register("i18n()", function(token, def, plural) {
        var ctx = this.context[0], resolved = _fnGetObjectDataFn(token)(ctx.oLanguage);
        return resolved === undefined && (resolved = def), plural !== undefined && $.isPlainObject(resolved) && (resolved = resolved[plural] !== undefined ? resolved[plural] : resolved._), 
        resolved.replace("%d", plural);
    }), DataTable.version = "1.10.12", DataTable.settings = [], DataTable.models = {}, 
    DataTable.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0
    }, DataTable.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    }, DataTable.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    }, DataTable.defaults = {
        aaData: null,
        aaSorting: [ [ 0, "asc" ] ],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [ 10, 25, 50, 100 ],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bJQueryUI: !1,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function(toFormat) {
            return toFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function(settings) {
            try {
                return JSON.parse((settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem("DataTables_" + settings.sInstance + "_" + location.pathname));
            } catch (e) {}
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function(settings, data) {
            try {
                (settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem("DataTables_" + settings.sInstance + "_" + location.pathname, JSON.stringify(data));
            } catch (e) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {
                sFirst: "First",
                sLast: "Last",
                sNext: "Next",
                sPrevious: "Previous"
            },
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: $.extend({}, DataTable.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    }, _fnHungarianMap(DataTable.defaults), DataTable.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: [ "asc", "desc" ],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    }, _fnHungarianMap(DataTable.defaults.column), DataTable.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {
            bCollapse: null,
            iBarWidth: 0,
            sX: null,
            sXInner: null,
            sY: null
        },
        oLanguage: {
            fnInfoCallback: null
        },
        oBrowser: {
            bScrollOversize: !1,
            bScrollbarLeft: !1,
            bBounding: !1,
            barWidth: 0
        },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: undefined,
        oAjaxData: undefined,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        bJUI: null,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function() {
            return "ssp" == _fnDataSource(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length;
        },
        fnRecordsDisplay: function() {
            return "ssp" == _fnDataSource(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length;
        },
        fnDisplayEnd: function() {
            var len = this._iDisplayLength, start = this._iDisplayStart, calc = start + len, records = this.aiDisplay.length, features = this.oFeatures, paginate = features.bPaginate;
            return features.bServerSide ? paginate === !1 || len === -1 ? start + records : Math.min(start + len, this._iRecordsDisplay) : !paginate || calc > records || len === -1 ? records : calc;
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    }, DataTable.ext = _ext = {
        buttons: {},
        classes: {},
        builder: "-source-",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {
            cell: [],
            column: [],
            row: []
        },
        internal: {},
        legacy: {
            ajax: null
        },
        pager: {},
        renderer: {
            pageButton: {},
            header: {}
        },
        order: {},
        type: {
            detect: [],
            search: {},
            order: {}
        },
        _unique: 0,
        fnVersionCheck: DataTable.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: DataTable.version
    }, $.extend(_ext, {
        afnFiltering: _ext.search,
        aTypes: _ext.type.detect,
        ofnSearch: _ext.type.search,
        oSort: _ext.type.order,
        afnSortData: _ext.order,
        aoFeatures: _ext.feature,
        oApi: _ext.internal,
        oStdClasses: _ext.classes,
        oPagination: _ext.pager
    }), $.extend(DataTable.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    }), function() {
        var _empty = "";
        _empty = "";
        var _stateDefault = _empty + "ui-state-default", _sortIcon = _empty + "css_right ui-icon ui-icon-", _headerFooter = _empty + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        $.extend(DataTable.ext.oJUIClasses, DataTable.ext.classes, {
            sPageButton: "fg-button ui-button " + _stateDefault,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: _stateDefault + " sorting_asc",
            sSortDesc: _stateDefault + " sorting_desc",
            sSortable: _stateDefault + " sorting",
            sSortableAsc: _stateDefault + " sorting_asc_disabled",
            sSortableDesc: _stateDefault + " sorting_desc_disabled",
            sSortableNone: _stateDefault + " sorting_disabled",
            sSortJUIAsc: _sortIcon + "triangle-1-n",
            sSortJUIDesc: _sortIcon + "triangle-1-s",
            sSortJUI: _sortIcon + "carat-2-n-s",
            sSortJUIAscAllowed: _sortIcon + "carat-1-n",
            sSortJUIDescAllowed: _sortIcon + "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + _stateDefault,
            sScrollFoot: "dataTables_scrollFoot " + _stateDefault,
            sHeaderTH: _stateDefault,
            sFooterTH: _stateDefault,
            sJUIHeader: _headerFooter + " ui-corner-tl ui-corner-tr",
            sJUIFooter: _headerFooter + " ui-corner-bl ui-corner-br"
        });
    }();
    var extPagination = DataTable.ext.pager;
    $.extend(extPagination, {
        simple: function(page, pages) {
            return [ "previous", "next" ];
        },
        full: function(page, pages) {
            return [ "first", "previous", "next", "last" ];
        },
        numbers: function(page, pages) {
            return [ _numbers(page, pages) ];
        },
        simple_numbers: function(page, pages) {
            return [ "previous", _numbers(page, pages), "next" ];
        },
        full_numbers: function(page, pages) {
            return [ "first", "previous", _numbers(page, pages), "next", "last" ];
        },
        _numbers: _numbers,
        numbers_length: 7
    }), $.extend(!0, DataTable.ext.renderer, {
        pageButton: {
            _: function(settings, host, idx, buttons, page, pages) {
                var btnDisplay, btnClass, activeEl, classes = settings.oClasses, lang = settings.oLanguage.oPaginate, aria = settings.oLanguage.oAria.paginate || {}, counter = 0, attach = function(container, buttons) {
                    var i, ien, node, button, clickHandler = function(e) {
                        _fnPageChange(settings, e.data.action, !0);
                    };
                    for (i = 0, ien = buttons.length; i < ien; i++) if (button = buttons[i], $.isArray(button)) {
                        var inner = $("<" + (button.DT_el || "div") + "/>").appendTo(container);
                        attach(inner, button);
                    } else {
                        switch (btnDisplay = null, btnClass = "", button) {
                          case "ellipsis":
                            container.append('<span class="ellipsis">&#x2026;</span>');
                            break;

                          case "first":
                            btnDisplay = lang.sFirst, btnClass = button + (page > 0 ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          case "previous":
                            btnDisplay = lang.sPrevious, btnClass = button + (page > 0 ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          case "next":
                            btnDisplay = lang.sNext, btnClass = button + (page < pages - 1 ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          case "last":
                            btnDisplay = lang.sLast, btnClass = button + (page < pages - 1 ? "" : " " + classes.sPageButtonDisabled);
                            break;

                          default:
                            btnDisplay = button + 1, btnClass = page === button ? classes.sPageButtonActive : "";
                        }
                        null !== btnDisplay && (node = $("<a>", {
                            "class": classes.sPageButton + " " + btnClass,
                            "aria-controls": settings.sTableId,
                            "aria-label": aria[button],
                            "data-dt-idx": counter,
                            tabindex: settings.iTabIndex,
                            id: 0 === idx && "string" == typeof button ? settings.sTableId + "_" + button : null
                        }).html(btnDisplay).appendTo(container), _fnBindAction(node, {
                            action: button
                        }, clickHandler), counter++);
                    }
                };
                try {
                    activeEl = $(host).find(document.activeElement).data("dt-idx");
                } catch (e) {}
                attach($(host).empty(), buttons), activeEl && $(host).find("[data-dt-idx=" + activeEl + "]").focus();
            }
        }
    }), $.extend(DataTable.ext.type.detect, [ function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _isNumber(d, decimal) ? "num" + decimal : null;
    }, function(d, settings) {
        if (d && !(d instanceof Date) && (!_re_date_start.test(d) || !_re_date_end.test(d))) return null;
        var parsed = Date.parse(d);
        return null !== parsed && !isNaN(parsed) || _empty(d) ? "date" : null;
    }, function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _isNumber(d, decimal, !0) ? "num-fmt" + decimal : null;
    }, function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _htmlNumeric(d, decimal) ? "html-num" + decimal : null;
    }, function(d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _htmlNumeric(d, decimal, !0) ? "html-num-fmt" + decimal : null;
    }, function(d, settings) {
        return _empty(d) || "string" == typeof d && d.indexOf("<") !== -1 ? "html" : null;
    } ]), $.extend(DataTable.ext.type.search, {
        html: function(data) {
            return _empty(data) ? data : "string" == typeof data ? data.replace(_re_new_lines, " ").replace(_re_html, "") : "";
        },
        string: function(data) {
            return _empty(data) ? data : "string" == typeof data ? data.replace(_re_new_lines, " ") : data;
        }
    });
    var __numericReplace = function(d, decimalPlace, re1, re2) {
        return 0 === d || d && "-" !== d ? (decimalPlace && (d = _numToDecimal(d, decimalPlace)), 
        d.replace && (re1 && (d = d.replace(re1, "")), re2 && (d = d.replace(re2, ""))), 
        1 * d) : -(1 / 0);
    };
    $.extend(_ext.type.order, {
        "date-pre": function(d) {
            return Date.parse(d) || 0;
        },
        "html-pre": function(a) {
            return _empty(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + "";
        },
        "string-pre": function(a) {
            return _empty(a) ? "" : "string" == typeof a ? a.toLowerCase() : a.toString ? a.toString() : "";
        },
        "string-asc": function(x, y) {
            return x < y ? -1 : x > y ? 1 : 0;
        },
        "string-desc": function(x, y) {
            return x < y ? 1 : x > y ? -1 : 0;
        }
    }), _addNumericSort(""), $.extend(!0, DataTable.ext.renderer, {
        header: {
            _: function(settings, cell, column, classes) {
                $(settings.nTable).on("order.dt.DT", function(e, ctx, sorting, columns) {
                    if (settings === ctx) {
                        var colIdx = column.idx;
                        cell.removeClass(column.sSortingClass + " " + classes.sSortAsc + " " + classes.sSortDesc).addClass("asc" == columns[colIdx] ? classes.sSortAsc : "desc" == columns[colIdx] ? classes.sSortDesc : column.sSortingClass);
                    }
                });
            },
            jqueryui: function(settings, cell, column, classes) {
                $("<div/>").addClass(classes.sSortJUIWrapper).append(cell.contents()).append($("<span/>").addClass(classes.sSortIcon + " " + column.sSortingClassJUI)).appendTo(cell), 
                $(settings.nTable).on("order.dt.DT", function(e, ctx, sorting, columns) {
                    if (settings === ctx) {
                        var colIdx = column.idx;
                        cell.removeClass(classes.sSortAsc + " " + classes.sSortDesc).addClass("asc" == columns[colIdx] ? classes.sSortAsc : "desc" == columns[colIdx] ? classes.sSortDesc : column.sSortingClass), 
                        cell.find("span." + classes.sSortIcon).removeClass(classes.sSortJUIAsc + " " + classes.sSortJUIDesc + " " + classes.sSortJUI + " " + classes.sSortJUIAscAllowed + " " + classes.sSortJUIDescAllowed).addClass("asc" == columns[colIdx] ? classes.sSortJUIAsc : "desc" == columns[colIdx] ? classes.sSortJUIDesc : column.sSortingClassJUI);
                    }
                });
            }
        }
    });
    var __htmlEscapeEntities = function(d) {
        return "string" == typeof d ? d.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : d;
    };
    return DataTable.render = {
        number: function(thousands, decimal, precision, prefix, postfix) {
            return {
                display: function(d) {
                    if ("number" != typeof d && "string" != typeof d) return d;
                    var negative = d < 0 ? "-" : "", flo = parseFloat(d);
                    if (isNaN(flo)) return __htmlEscapeEntities(d);
                    d = Math.abs(flo);
                    var intPart = parseInt(d, 10), floatPart = precision ? decimal + (d - intPart).toFixed(precision).substring(2) : "";
                    return negative + (prefix || "") + intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousands) + floatPart + (postfix || "");
                }
            };
        },
        text: function() {
            return {
                display: __htmlEscapeEntities
            };
        }
    }, $.extend(DataTable.ext.internal, {
        _fnExternApiFunc: _fnExternApiFunc,
        _fnBuildAjax: _fnBuildAjax,
        _fnAjaxUpdate: _fnAjaxUpdate,
        _fnAjaxParameters: _fnAjaxParameters,
        _fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
        _fnAjaxDataSrc: _fnAjaxDataSrc,
        _fnAddColumn: _fnAddColumn,
        _fnColumnOptions: _fnColumnOptions,
        _fnAdjustColumnSizing: _fnAdjustColumnSizing,
        _fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
        _fnColumnIndexToVisible: _fnColumnIndexToVisible,
        _fnVisbleColumns: _fnVisbleColumns,
        _fnGetColumns: _fnGetColumns,
        _fnColumnTypes: _fnColumnTypes,
        _fnApplyColumnDefs: _fnApplyColumnDefs,
        _fnHungarianMap: _fnHungarianMap,
        _fnCamelToHungarian: _fnCamelToHungarian,
        _fnLanguageCompat: _fnLanguageCompat,
        _fnBrowserDetect: _fnBrowserDetect,
        _fnAddData: _fnAddData,
        _fnAddTr: _fnAddTr,
        _fnNodeToDataIndex: _fnNodeToDataIndex,
        _fnNodeToColumnIndex: _fnNodeToColumnIndex,
        _fnGetCellData: _fnGetCellData,
        _fnSetCellData: _fnSetCellData,
        _fnSplitObjNotation: _fnSplitObjNotation,
        _fnGetObjectDataFn: _fnGetObjectDataFn,
        _fnSetObjectDataFn: _fnSetObjectDataFn,
        _fnGetDataMaster: _fnGetDataMaster,
        _fnClearTable: _fnClearTable,
        _fnDeleteIndex: _fnDeleteIndex,
        _fnInvalidate: _fnInvalidate,
        _fnGetRowElements: _fnGetRowElements,
        _fnCreateTr: _fnCreateTr,
        _fnBuildHead: _fnBuildHead,
        _fnDrawHead: _fnDrawHead,
        _fnDraw: _fnDraw,
        _fnReDraw: _fnReDraw,
        _fnAddOptionsHtml: _fnAddOptionsHtml,
        _fnDetectHeader: _fnDetectHeader,
        _fnGetUniqueThs: _fnGetUniqueThs,
        _fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
        _fnFilterComplete: _fnFilterComplete,
        _fnFilterCustom: _fnFilterCustom,
        _fnFilterColumn: _fnFilterColumn,
        _fnFilter: _fnFilter,
        _fnFilterCreateSearch: _fnFilterCreateSearch,
        _fnEscapeRegex: _fnEscapeRegex,
        _fnFilterData: _fnFilterData,
        _fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
        _fnUpdateInfo: _fnUpdateInfo,
        _fnInfoMacros: _fnInfoMacros,
        _fnInitialise: _fnInitialise,
        _fnInitComplete: _fnInitComplete,
        _fnLengthChange: _fnLengthChange,
        _fnFeatureHtmlLength: _fnFeatureHtmlLength,
        _fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
        _fnPageChange: _fnPageChange,
        _fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
        _fnProcessingDisplay: _fnProcessingDisplay,
        _fnFeatureHtmlTable: _fnFeatureHtmlTable,
        _fnScrollDraw: _fnScrollDraw,
        _fnApplyToChildren: _fnApplyToChildren,
        _fnCalculateColumnWidths: _fnCalculateColumnWidths,
        _fnThrottle: _fnThrottle,
        _fnConvertToWidth: _fnConvertToWidth,
        _fnGetWidestNode: _fnGetWidestNode,
        _fnGetMaxLenString: _fnGetMaxLenString,
        _fnStringToCss: _fnStringToCss,
        _fnSortFlatten: _fnSortFlatten,
        _fnSort: _fnSort,
        _fnSortAria: _fnSortAria,
        _fnSortListener: _fnSortListener,
        _fnSortAttachListener: _fnSortAttachListener,
        _fnSortingClasses: _fnSortingClasses,
        _fnSortData: _fnSortData,
        _fnSaveState: _fnSaveState,
        _fnLoadState: _fnLoadState,
        _fnSettingsFromNode: _fnSettingsFromNode,
        _fnLog: _fnLog,
        _fnMap: _fnMap,
        _fnBindAction: _fnBindAction,
        _fnCallbackReg: _fnCallbackReg,
        _fnCallbackFire: _fnCallbackFire,
        _fnLengthOverflow: _fnLengthOverflow,
        _fnRenderer: _fnRenderer,
        _fnDataSource: _fnDataSource,
        _fnRowAttributes: _fnRowAttributes,
        _fnCalculateEnd: function() {}
    }), $.fn.dataTable = DataTable, DataTable.$ = $, $.fn.dataTableSettings = DataTable.settings, 
    $.fn.dataTableExt = DataTable.ext, $.fn.DataTable = function(opts) {
        return $(this).dataTable(opts).api();
    }, $.each(DataTable, function(prop, val) {
        $.fn.DataTable[prop] = val;
    }), $.fn.dataTable;
}), function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "datatables.net" ], function($) {
        return factory($, window, document);
    }) : "object" == typeof exports ? module.exports = function(root, $) {
        return root || (root = window), $ && $.fn.dataTable || ($ = require("datatables.net")(root, $).$), 
        factory($, root, root.document);
    } : factory(jQuery, window, document);
}(function($, window, document, undefined) {
    "use strict";
    var DataTable = $.fn.dataTable;
    return $.extend(!0, DataTable.defaults, {
        dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
        renderer: "bootstrap"
    }), $.extend(DataTable.ext.classes, {
        sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
        sFilterInput: "form-control input-sm",
        sLengthSelect: "form-control input-sm",
        sProcessing: "dataTables_processing panel panel-default"
    }), DataTable.ext.renderer.pageButton.bootstrap = function(settings, host, idx, buttons, page, pages) {
        var btnDisplay, btnClass, activeEl, api = new DataTable.Api(settings), classes = settings.oClasses, lang = settings.oLanguage.oPaginate, aria = settings.oLanguage.oAria.paginate || {}, counter = 0, attach = function(container, buttons) {
            var i, ien, node, button, clickHandler = function(e) {
                e.preventDefault(), $(e.currentTarget).hasClass("disabled") || api.page() == e.data.action || api.page(e.data.action).draw("page");
            };
            for (i = 0, ien = buttons.length; i < ien; i++) if (button = buttons[i], $.isArray(button)) attach(container, button); else {
                switch (btnDisplay = "", btnClass = "", button) {
                  case "ellipsis":
                    btnDisplay = "&#x2026;", btnClass = "disabled";
                    break;

                  case "first":
                    btnDisplay = lang.sFirst, btnClass = button + (page > 0 ? "" : " disabled");
                    break;

                  case "previous":
                    btnDisplay = lang.sPrevious, btnClass = button + (page > 0 ? "" : " disabled");
                    break;

                  case "next":
                    btnDisplay = lang.sNext, btnClass = button + (page < pages - 1 ? "" : " disabled");
                    break;

                  case "last":
                    btnDisplay = lang.sLast, btnClass = button + (page < pages - 1 ? "" : " disabled");
                    break;

                  default:
                    btnDisplay = button + 1, btnClass = page === button ? "active" : "";
                }
                btnDisplay && (node = $("<li>", {
                    "class": classes.sPageButton + " " + btnClass,
                    id: 0 === idx && "string" == typeof button ? settings.sTableId + "_" + button : null
                }).append($("<a>", {
                    href: "#",
                    "aria-controls": settings.sTableId,
                    "aria-label": aria[button],
                    "data-dt-idx": counter,
                    tabindex: settings.iTabIndex
                }).html(btnDisplay)).appendTo(container), settings.oApi._fnBindAction(node, {
                    action: button
                }, clickHandler), counter++);
            }
        };
        try {
            activeEl = $(host).find(document.activeElement).data("dt-idx");
        } catch (e) {}
        attach($(host).empty().html('<ul class="pagination"/>').children("ul"), buttons), 
        activeEl && $(host).find("[data-dt-idx=" + activeEl + "]").focus();
    }, DataTable;
}), function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "datatables.net" ], function($) {
        return factory($, window, document);
    }) : "object" == typeof exports ? module.exports = function(root, $) {
        return root || (root = window), $ && $.fn.dataTable || ($ = require("datatables.net")(root, $).$), 
        factory($, root, root.document);
    } : factory(jQuery, window, document);
}(function($, window, document, undefined) {
    "use strict";
    var DataTable = $.fn.dataTable, Responsive = function(settings, opts) {
        if (!DataTable.versionCheck || !DataTable.versionCheck("1.10.3")) throw "DataTables Responsive requires DataTables 1.10.3 or newer";
        this.s = {
            dt: new DataTable.Api(settings),
            columns: [],
            current: []
        }, this.s.dt.settings()[0].responsive || (opts && "string" == typeof opts.details ? opts.details = {
            type: opts.details
        } : opts && opts.details === !1 ? opts.details = {
            type: !1
        } : opts && opts.details === !0 && (opts.details = {
            type: "inline"
        }), this.c = $.extend(!0, {}, Responsive.defaults, DataTable.defaults.responsive, opts), 
        settings.responsive = this, this._constructor());
    };
    $.extend(Responsive.prototype, {
        _constructor: function() {
            var that = this, dt = this.s.dt, dtPrivateSettings = dt.settings()[0], oldWindowWidth = $(window).width();
            dt.settings()[0]._responsive = this, $(window).on("resize.dtr orientationchange.dtr", DataTable.util.throttle(function() {
                var width = $(window).width();
                width !== oldWindowWidth && (that._resize(), oldWindowWidth = width);
            })), dtPrivateSettings.oApi._fnCallbackReg(dtPrivateSettings, "aoRowCreatedCallback", function(tr, data, idx) {
                $.inArray(!1, that.s.current) !== -1 && $("td, th", tr).each(function(i) {
                    var idx = dt.column.index("toData", i);
                    that.s.current[idx] === !1 && $(this).css("display", "none");
                });
            }), dt.on("destroy.dtr", function() {
                dt.off(".dtr"), $(dt.table().body()).off(".dtr"), $(window).off("resize.dtr orientationchange.dtr"), 
                $.each(that.s.current, function(i, val) {
                    val === !1 && that._setColumnVis(i, !0);
                });
            }), this.c.breakpoints.sort(function(a, b) {
                return a.width < b.width ? 1 : a.width > b.width ? -1 : 0;
            }), this._classLogic(), this._resizeAuto();
            var details = this.c.details;
            details.type !== !1 && (that._detailsInit(), dt.on("column-visibility.dtr", function(e, ctx, col, vis) {
                that._classLogic(), that._resizeAuto(), that._resize();
            }), dt.on("draw.dtr", function() {
                that._redrawChildren();
            }), $(dt.table().node()).addClass("dtr-" + details.type)), dt.on("column-reorder.dtr", function(e, settings, details) {
                that._classLogic(), that._resizeAuto(), that._resize();
            }), dt.on("column-sizing.dtr", function() {
                that._resizeAuto(), that._resize();
            }), dt.on("init.dtr", function(e, settings, details) {
                that._resizeAuto(), that._resize(), $.inArray(!1, that.s.current) && dt.columns.adjust();
            }), this._resize();
        },
        _columnsVisiblity: function(breakpoint) {
            var i, ien, dt = this.s.dt, columns = this.s.columns, order = columns.map(function(col, idx) {
                return {
                    columnIdx: idx,
                    priority: col.priority
                };
            }).sort(function(a, b) {
                return a.priority !== b.priority ? a.priority - b.priority : a.columnIdx - b.columnIdx;
            }), display = $.map(columns, function(col) {
                return (!col.auto || null !== col.minWidth) && (col.auto === !0 ? "-" : $.inArray(breakpoint, col.includeIn) !== -1);
            }), requiredWidth = 0;
            for (i = 0, ien = display.length; i < ien; i++) display[i] === !0 && (requiredWidth += columns[i].minWidth);
            var scrolling = dt.settings()[0].oScroll, bar = scrolling.sY || scrolling.sX ? scrolling.iBarWidth : 0, widthAvailable = dt.table().container().offsetWidth - bar, usedWidth = widthAvailable - requiredWidth;
            for (i = 0, ien = display.length; i < ien; i++) columns[i].control && (usedWidth -= columns[i].minWidth);
            var empty = !1;
            for (i = 0, ien = order.length; i < ien; i++) {
                var colIdx = order[i].columnIdx;
                "-" === display[colIdx] && !columns[colIdx].control && columns[colIdx].minWidth && (empty || usedWidth - columns[colIdx].minWidth < 0 ? (empty = !0, 
                display[colIdx] = !1) : display[colIdx] = !0, usedWidth -= columns[colIdx].minWidth);
            }
            var showControl = !1;
            for (i = 0, ien = columns.length; i < ien; i++) if (!columns[i].control && !columns[i].never && !display[i]) {
                showControl = !0;
                break;
            }
            for (i = 0, ien = columns.length; i < ien; i++) columns[i].control && (display[i] = showControl);
            return $.inArray(!0, display) === -1 && (display[0] = !0), display;
        },
        _classLogic: function() {
            var that = this, breakpoints = this.c.breakpoints, dt = this.s.dt, columns = dt.columns().eq(0).map(function(i) {
                var column = this.column(i), className = column.header().className, priority = dt.settings()[0].aoColumns[i].responsivePriority;
                if (priority === undefined) {
                    var dataPriority = $(column.header()).data("priority");
                    priority = dataPriority !== undefined ? 1 * dataPriority : 1e4;
                }
                return {
                    className: className,
                    includeIn: [],
                    auto: !1,
                    control: !1,
                    never: !!className.match(/\bnever\b/),
                    priority: priority
                };
            }), add = function(colIdx, name) {
                var includeIn = columns[colIdx].includeIn;
                $.inArray(name, includeIn) === -1 && includeIn.push(name);
            }, column = function(colIdx, name, operator, matched) {
                var size, i, ien;
                if (operator) {
                    if ("max-" === operator) for (size = that._find(name).width, i = 0, ien = breakpoints.length; i < ien; i++) breakpoints[i].width <= size && add(colIdx, breakpoints[i].name); else if ("min-" === operator) for (size = that._find(name).width, 
                    i = 0, ien = breakpoints.length; i < ien; i++) breakpoints[i].width >= size && add(colIdx, breakpoints[i].name); else if ("not-" === operator) for (i = 0, 
                    ien = breakpoints.length; i < ien; i++) breakpoints[i].name.indexOf(matched) === -1 && add(colIdx, breakpoints[i].name);
                } else columns[colIdx].includeIn.push(name);
            };
            columns.each(function(col, i) {
                for (var classNames = col.className.split(" "), hasClass = !1, k = 0, ken = classNames.length; k < ken; k++) {
                    var className = $.trim(classNames[k]);
                    if ("all" === className) return hasClass = !0, void (col.includeIn = $.map(breakpoints, function(a) {
                        return a.name;
                    }));
                    if ("none" === className || col.never) return void (hasClass = !0);
                    if ("control" === className) return hasClass = !0, void (col.control = !0);
                    $.each(breakpoints, function(j, breakpoint) {
                        var brokenPoint = breakpoint.name.split("-"), re = new RegExp("(min\\-|max\\-|not\\-)?(" + brokenPoint[0] + ")(\\-[_a-zA-Z0-9])?"), match = className.match(re);
                        match && (hasClass = !0, match[2] === brokenPoint[0] && match[3] === "-" + brokenPoint[1] ? column(i, breakpoint.name, match[1], match[2] + match[3]) : match[2] !== brokenPoint[0] || match[3] || column(i, breakpoint.name, match[1], match[2]));
                    });
                }
                hasClass || (col.auto = !0);
            }), this.s.columns = columns;
        },
        _detailsDisplay: function(row, update) {
            var that = this, dt = this.s.dt, details = this.c.details;
            if (details && details.type !== !1) {
                var res = details.display(row, update, function() {
                    return details.renderer(dt, row[0], that._detailsObj(row[0]));
                });
                res !== !0 && res !== !1 || $(dt.table().node()).triggerHandler("responsive-display.dt", [ dt, row, res, update ]);
            }
        },
        _detailsInit: function() {
            var that = this, dt = this.s.dt, details = this.c.details;
            "inline" === details.type && (details.target = "td:first-child, th:first-child"), 
            dt.on("draw.dtr", function() {
                that._tabIndexes();
            }), that._tabIndexes(), $(dt.table().body()).on("keyup.dtr", "td, th", function(e) {
                13 === e.keyCode && $(this).data("dtr-keyboard") && $(this).click();
            });
            var target = details.target, selector = "string" == typeof target ? target : "td, th";
            $(dt.table().body()).on("click.dtr mousedown.dtr mouseup.dtr", selector, function(e) {
                if ($(dt.table().node()).hasClass("collapsed") && dt.row($(this).closest("tr")).length) {
                    if ("number" == typeof target) {
                        var targetIdx = target < 0 ? dt.columns().eq(0).length + target : target;
                        if (dt.cell(this).index().column !== targetIdx) return;
                    }
                    var row = dt.row($(this).closest("tr"));
                    "click" === e.type ? that._detailsDisplay(row, !1) : "mousedown" === e.type ? $(this).css("outline", "none") : "mouseup" === e.type && $(this).blur().css("outline", "");
                }
            });
        },
        _detailsObj: function(rowIdx) {
            var that = this, dt = this.s.dt;
            return $.map(this.s.columns, function(col, i) {
                if (!col.never && !col.control) return {
                    title: dt.settings()[0].aoColumns[i].sTitle,
                    data: dt.cell(rowIdx, i).render(that.c.orthogonal),
                    hidden: dt.column(i).visible() && !that.s.current[i],
                    columnIndex: i,
                    rowIndex: rowIdx
                };
            });
        },
        _find: function(name) {
            for (var breakpoints = this.c.breakpoints, i = 0, ien = breakpoints.length; i < ien; i++) if (breakpoints[i].name === name) return breakpoints[i];
        },
        _redrawChildren: function() {
            var that = this, dt = this.s.dt;
            dt.rows({
                page: "current"
            }).iterator("row", function(settings, idx) {
                dt.row(idx);
                that._detailsDisplay(dt.row(idx), !0);
            });
        },
        _resize: function() {
            var i, ien, that = this, dt = this.s.dt, width = $(window).width(), breakpoints = this.c.breakpoints, breakpoint = breakpoints[0].name, columns = this.s.columns, oldVis = this.s.current.slice();
            for (i = breakpoints.length - 1; i >= 0; i--) if (width <= breakpoints[i].width) {
                breakpoint = breakpoints[i].name;
                break;
            }
            var columnsVis = this._columnsVisiblity(breakpoint);
            this.s.current = columnsVis;
            var collapsedClass = !1;
            for (i = 0, ien = columns.length; i < ien; i++) if (columnsVis[i] === !1 && !columns[i].never && !columns[i].control) {
                collapsedClass = !0;
                break;
            }
            $(dt.table().node()).toggleClass("collapsed", collapsedClass);
            var changed = !1;
            dt.columns().eq(0).each(function(colIdx, i) {
                columnsVis[i] !== oldVis[i] && (changed = !0, that._setColumnVis(colIdx, columnsVis[i]));
            }), changed && (this._redrawChildren(), $(dt.table().node()).trigger("responsive-resize.dt", [ dt, this.s.current ]));
        },
        _resizeAuto: function() {
            var dt = this.s.dt, columns = this.s.columns;
            if (this.c.auto && $.inArray(!0, $.map(columns, function(c) {
                return c.auto;
            })) !== -1) {
                var clonedTable = (dt.table().node().offsetWidth, dt.columns, dt.table().node().cloneNode(!1)), clonedHeader = $(dt.table().header().cloneNode(!1)).appendTo(clonedTable), clonedBody = $(dt.table().body()).clone(!1, !1).empty().appendTo(clonedTable), headerCells = dt.columns().header().filter(function(idx) {
                    return dt.column(idx).visible();
                }).to$().clone(!1).css("display", "table-cell");
                $(clonedBody).append($(dt.rows({
                    page: "current"
                }).nodes()).clone(!1)).find("th, td").css("display", "");
                var footer = dt.table().footer();
                if (footer) {
                    var clonedFooter = $(footer.cloneNode(!1)).appendTo(clonedTable), footerCells = dt.columns().footer().filter(function(idx) {
                        return dt.column(idx).visible();
                    }).to$().clone(!1).css("display", "table-cell");
                    $("<tr/>").append(footerCells).appendTo(clonedFooter);
                }
                $("<tr/>").append(headerCells).appendTo(clonedHeader), "inline" === this.c.details.type && $(clonedTable).addClass("dtr-inline collapsed"), 
                $(clonedTable).find("[name]").removeAttr("name");
                var inserted = $("<div/>").css({
                    width: 1,
                    height: 1,
                    overflow: "hidden"
                }).append(clonedTable);
                inserted.insertBefore(dt.table().node()), headerCells.each(function(i) {
                    var idx = dt.column.index("fromVisible", i);
                    columns[idx].minWidth = this.offsetWidth || 0;
                }), inserted.remove();
            }
        },
        _setColumnVis: function(col, showHide) {
            var dt = this.s.dt, display = showHide ? "" : "none";
            $(dt.column(col).header()).css("display", display), $(dt.column(col).footer()).css("display", display), 
            dt.column(col).nodes().to$().css("display", display);
        },
        _tabIndexes: function() {
            var dt = this.s.dt, cells = dt.cells({
                page: "current"
            }).nodes().to$(), ctx = dt.settings()[0], target = this.c.details.target;
            cells.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");
            var selector = "number" == typeof target ? ":eq(" + target + ")" : target;
            $(selector, dt.rows({
                page: "current"
            }).nodes()).attr("tabIndex", ctx.iTabIndex).data("dtr-keyboard", 1);
        }
    }), Responsive.breakpoints = [ {
        name: "desktop",
        width: 1 / 0
    }, {
        name: "tablet-l",
        width: 1024
    }, {
        name: "tablet-p",
        width: 768
    }, {
        name: "mobile-l",
        width: 480
    }, {
        name: "mobile-p",
        width: 320
    } ], Responsive.display = {
        childRow: function(row, update, render) {
            return update ? $(row.node()).hasClass("parent") ? (row.child(render(), "child").show(), 
            !0) : void 0 : row.child.isShown() ? (row.child(!1), $(row.node()).removeClass("parent"), 
            !1) : (row.child(render(), "child").show(), $(row.node()).addClass("parent"), !0);
        },
        childRowImmediate: function(row, update, render) {
            return !update && row.child.isShown() || !row.responsive.hasHidden() ? (row.child(!1), 
            $(row.node()).removeClass("parent"), !1) : (row.child(render(), "child").show(), 
            $(row.node()).addClass("parent"), !0);
        },
        modal: function(options) {
            return function(row, update, render) {
                if (update) $("div.dtr-modal-content").empty().append(render()); else {
                    var close = function() {
                        modal.remove(), $(document).off("keypress.dtr");
                    }, modal = $('<div class="dtr-modal"/>').append($('<div class="dtr-modal-display"/>').append($('<div class="dtr-modal-content"/>').append(render())).append($('<div class="dtr-modal-close">&times;</div>').click(function() {
                        close();
                    }))).append($('<div class="dtr-modal-background"/>').click(function() {
                        close();
                    })).appendTo("body");
                    $(document).on("keyup.dtr", function(e) {
                        27 === e.keyCode && (e.stopPropagation(), close());
                    });
                }
                options && options.header && $("div.dtr-modal-content").prepend("<h2>" + options.header(row) + "</h2>");
            };
        }
    }, Responsive.renderer = {
        listHidden: function() {
            return function(api, rowIdx, columns) {
                var data = $.map(columns, function(col) {
                    return col.hidden ? '<li data-dtr-index="' + col.columnIndex + '" data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '"><span class="dtr-title">' + col.title + '</span> <span class="dtr-data">' + col.data + "</span></li>" : "";
                }).join("");
                return !!data && $('<ul data-dtr-index="' + rowIdx + '"/>').append(data);
            };
        },
        tableAll: function(options) {
            return options = $.extend({
                tableClass: ""
            }, options), function(api, rowIdx, columns) {
                var data = $.map(columns, function(col) {
                    return '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '"><td>' + col.title + ":</td> <td>" + col.data + "</td></tr>";
                }).join("");
                return $('<table class="' + options.tableClass + '" width="100%"/>').append(data);
            };
        }
    }, Responsive.defaults = {
        breakpoints: Responsive.breakpoints,
        auto: !0,
        details: {
            display: Responsive.display.childRow,
            renderer: Responsive.renderer.listHidden(),
            target: 0,
            type: "inline"
        },
        orthogonal: "display"
    };
    var Api = $.fn.dataTable.Api;
    return Api.register("responsive()", function() {
        return this;
    }), Api.register("responsive.index()", function(li) {
        return li = $(li), {
            column: li.data("dtr-index"),
            row: li.parent().data("dtr-index")
        };
    }), Api.register("responsive.rebuild()", function() {
        return this.iterator("table", function(ctx) {
            ctx._responsive && ctx._responsive._classLogic();
        });
    }), Api.register("responsive.recalc()", function() {
        return this.iterator("table", function(ctx) {
            ctx._responsive && (ctx._responsive._resizeAuto(), ctx._responsive._resize());
        });
    }), Api.register("responsive.hasHidden()", function() {
        var ctx = this.context[0];
        return !!ctx._responsive && $.inArray(!1, ctx._responsive.s.current) !== -1;
    }), Responsive.version = "2.1.0", $.fn.dataTable.Responsive = Responsive, $.fn.DataTable.Responsive = Responsive, 
    $(document).on("preInit.dt.dtr", function(e, settings, json) {
        if ("dt" === e.namespace && ($(settings.nTable).hasClass("responsive") || $(settings.nTable).hasClass("dt-responsive") || settings.oInit.responsive || DataTable.defaults.responsive)) {
            var init = settings.oInit.responsive;
            init !== !1 && new Responsive(settings, $.isPlainObject(init) ? init : {});
        }
    }), Responsive;
}), function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery", "datatables.net-bs", "datatables.net-responsive" ], function($) {
        return factory($, window, document);
    }) : "object" == typeof exports ? module.exports = function(root, $) {
        return root || (root = window), $ && $.fn.dataTable || ($ = require("datatables.net-bs")(root, $).$), 
        $.fn.dataTable.Responsive || require("datatables.net-responsive")(root, $), factory($, root, root.document);
    } : factory(jQuery, window, document);
}(function($, window, document, undefined) {
    "use strict";
    var DataTable = $.fn.dataTable, _display = DataTable.Responsive.display, _original = _display.modal, _modal = $('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"/></div></div></div>').html();
    return _display.modal = function(options) {
        return function(row, update, render) {
            $.fn.modal ? update || (options && options.header && _modal.find("div.modal-header").empty().append('<h4 class="modal-title">' + options.header(row) + "</h4>"), 
            _modal.find("div.modal-body").empty().append(render()), _modal.appendTo("body").modal()) : _original(row, update, render);
        };
    }, DataTable.Responsive;
}), +function(a) {
    "use strict";
    function b(b) {
        return b.is('[type="checkbox"]') ? b.prop("checked") : b.is('[type="radio"]') ? !!a('[name="' + b.attr("name") + '"]:checked').length : b.is("select[multiple]") ? (b.val() || []).length : b.val();
    }
    function c(b) {
        return this.each(function() {
            var c = a(this), e = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b), f = c.data("bs.validator");
            (f || "destroy" != b) && (f || c.data("bs.validator", f = new d(this, e)), "string" == typeof b && f[b]());
        });
    }
    var d = function(c, e) {
        this.options = e, this.validators = a.extend({}, d.VALIDATORS, e.custom), this.$element = a(c), 
        this.$btn = a('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]')), 
        this.update(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", a.proxy(this.onInput, this)), 
        this.$element.on("submit.bs.validator", a.proxy(this.onSubmit, this)), this.$element.on("reset.bs.validator", a.proxy(this.reset, this)), 
        this.$element.find("[data-match]").each(function() {
            var c = a(this), d = c.attr("data-match");
            a(d).on("input.bs.validator", function() {
                b(c) && c.trigger("input.bs.validator");
            });
        }), this.$inputs.filter(function() {
            return b(a(this)) && !a(this).closest(".has-error").length;
        }).trigger("focusout"), this.$element.attr("novalidate", !0);
    };
    d.VERSION = "0.11.9", d.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)', 
    d.FOCUS_OFFSET = 20, d.DEFAULTS = {
        delay: 500,
        html: !1,
        disable: !0,
        focus: !0,
        custom: {},
        errors: {
            match: "Does not match",
            minlength: "Not long enough"
        },
        feedback: {
            success: "glyphicon-ok",
            error: "glyphicon-remove"
        }
    }, d.VALIDATORS = {
        "native": function(a) {
            var b = a[0];
            return b.checkValidity ? !b.checkValidity() && !b.validity.valid && (b.validationMessage || "error!") : void 0;
        },
        match: function(b) {
            var c = b.attr("data-match");
            return b.val() !== a(c).val() && d.DEFAULTS.errors.match;
        },
        minlength: function(a) {
            var b = a.attr("data-minlength");
            return a.val().length < b && d.DEFAULTS.errors.minlength;
        }
    }, d.prototype.update = function() {
        var b = this;
        return this.$inputs = this.$element.find(d.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]').each(function() {
            b.clearErrors(a(this));
        })), this.toggleSubmit(), this;
    }, d.prototype.onInput = function(b) {
        var c = this, d = a(b.target), e = "focusout" !== b.type;
        this.$inputs.is(d) && this.validateInput(d, e).done(function() {
            c.toggleSubmit();
        });
    }, d.prototype.validateInput = function(c, d) {
        var e = (b(c), c.data("bs.validator.errors"));
        c.is('[type="radio"]') && (c = this.$element.find('input[name="' + c.attr("name") + '"]'));
        var f = a.Event("validate.bs.validator", {
            relatedTarget: c[0]
        });
        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
            var g = this;
            return this.runValidators(c).done(function(b) {
                c.data("bs.validator.errors", b), b.length ? d ? g.defer(c, g.showErrors) : g.showErrors(c) : g.clearErrors(c), 
                e && b.toString() === e.toString() || (f = b.length ? a.Event("invalid.bs.validator", {
                    relatedTarget: c[0],
                    detail: b
                }) : a.Event("valid.bs.validator", {
                    relatedTarget: c[0],
                    detail: e
                }), g.$element.trigger(f)), g.toggleSubmit(), g.$element.trigger(a.Event("validated.bs.validator", {
                    relatedTarget: c[0]
                }));
            });
        }
    }, d.prototype.runValidators = function(c) {
        function d(a) {
            return c.attr("data-" + a + "-error");
        }
        function e() {
            var a = c[0].validity;
            return a.typeMismatch ? c.attr("data-type-error") : a.patternMismatch ? c.attr("data-pattern-error") : a.stepMismatch ? c.attr("data-step-error") : a.rangeOverflow ? c.attr("data-max-error") : a.rangeUnderflow ? c.attr("data-min-error") : a.valueMissing ? c.attr("data-required-error") : null;
        }
        function f() {
            return c.attr("data-error");
        }
        function g(a) {
            return d(a) || e() || f();
        }
        var h = [], i = a.Deferred();
        return c.data("bs.validator.deferred") && c.data("bs.validator.deferred").reject(), 
        c.data("bs.validator.deferred", i), a.each(this.validators, a.proxy(function(a, d) {
            var e = null;
            !b(c) && !c.attr("required") || void 0 === c.attr("data-" + a) && "native" != a || !(e = d.call(this, c)) || (e = g(a) || e, 
            !~h.indexOf(e) && h.push(e));
        }, this)), !h.length && b(c) && c.attr("data-remote") ? this.defer(c, function() {
            var d = {};
            d[c.attr("name")] = b(c), a.get(c.attr("data-remote"), d).fail(function(a, b, c) {
                h.push(g("remote") || c);
            }).always(function() {
                i.resolve(h);
            });
        }) : i.resolve(h), i.promise();
    }, d.prototype.validate = function() {
        var b = this;
        return a.when(this.$inputs.map(function() {
            return b.validateInput(a(this), !1);
        })).then(function() {
            b.toggleSubmit(), b.focusError();
        }), this;
    }, d.prototype.focusError = function() {
        if (this.options.focus) {
            var b = this.$element.find(".has-error :input:first");
            0 !== b.length && (a("html, body").animate({
                scrollTop: b.offset().top - d.FOCUS_OFFSET
            }, 250), b.focus());
        }
    }, d.prototype.showErrors = function(b) {
        var c = this.options.html ? "html" : "text", d = b.data("bs.validator.errors"), e = b.closest(".form-group"), f = e.find(".help-block.with-errors"), g = e.find(".form-control-feedback");
        d.length && (d = a("<ul/>").addClass("list-unstyled").append(a.map(d, function(b) {
            return a("<li/>")[c](b);
        })), void 0 === f.data("bs.validator.originalContent") && f.data("bs.validator.originalContent", f.html()), 
        f.empty().append(d), e.addClass("has-error has-danger"), e.hasClass("has-feedback") && g.removeClass(this.options.feedback.success) && g.addClass(this.options.feedback.error) && e.removeClass("has-success"));
    }, d.prototype.clearErrors = function(a) {
        var c = a.closest(".form-group"), d = c.find(".help-block.with-errors"), e = c.find(".form-control-feedback");
        d.html(d.data("bs.validator.originalContent")), c.removeClass("has-error has-danger has-success"), 
        c.hasClass("has-feedback") && e.removeClass(this.options.feedback.error) && e.removeClass(this.options.feedback.success) && b(a) && e.addClass(this.options.feedback.success) && c.addClass("has-success");
    }, d.prototype.hasErrors = function() {
        function b() {
            return !!(a(this).data("bs.validator.errors") || []).length;
        }
        return !!this.$inputs.filter(b).length;
    }, d.prototype.isIncomplete = function() {
        function c() {
            var c = b(a(this));
            return !("string" == typeof c ? a.trim(c) : c);
        }
        return !!this.$inputs.filter("[required]").filter(c).length;
    }, d.prototype.onSubmit = function(a) {
        this.validate(), (this.isIncomplete() || this.hasErrors()) && a.preventDefault();
    }, d.prototype.toggleSubmit = function() {
        this.options.disable && this.$btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors());
    }, d.prototype.defer = function(b, c) {
        return c = a.proxy(c, this, b), this.options.delay ? (window.clearTimeout(b.data("bs.validator.timeout")), 
        void b.data("bs.validator.timeout", window.setTimeout(c, this.options.delay))) : c();
    }, d.prototype.reset = function() {
        return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success), 
        this.$inputs.removeData([ "bs.validator.errors", "bs.validator.deferred" ]).each(function() {
            var b = a(this), c = b.data("bs.validator.timeout");
            window.clearTimeout(c) && b.removeData("bs.validator.timeout");
        }), this.$element.find(".help-block.with-errors").each(function() {
            var b = a(this), c = b.data("bs.validator.originalContent");
            b.removeData("bs.validator.originalContent").html(c);
        }), this.$btn.removeClass("disabled"), this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"), 
        this;
    }, d.prototype.destroy = function() {
        return this.reset(), this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"), 
        this.$inputs.off(".bs.validator"), this.options = null, this.validators = null, 
        this.$element = null, this.$btn = null, this.$inputs = null, this;
    };
    var e = a.fn.validator;
    a.fn.validator = c, a.fn.validator.Constructor = d, a.fn.validator.noConflict = function() {
        return a.fn.validator = e, this;
    }, a(window).on("load", function() {
        a('form[data-toggle="validator"]').each(function() {
            var b = a(this);
            c.call(b, b.data());
        });
    });
}(jQuery), !function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function(t) {
    var e = -1, o = -1, i = function(t) {
        return parseFloat(t) || 0;
    }, a = function(e) {
        var o = 1, a = t(e), n = null, r = [];
        return a.each(function() {
            var e = t(this), a = e.offset().top - i(e.css("margin-top")), s = r.length > 0 ? r[r.length - 1] : null;
            null === s ? r.push(e) : Math.floor(Math.abs(n - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), 
            n = a;
        }), r;
    }, n = function(e) {
        var o = {
            byRow: !0,
            property: "height",
            target: null,
            remove: !1
        };
        return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), 
        o);
    }, r = t.fn.matchHeight = function(e) {
        var o = n(e);
        if (o.remove) {
            var i = this;
            return this.css(o.property, ""), t.each(r._groups, function(t, e) {
                e.elements = e.elements.not(i);
            }), this;
        }
        return this.length <= 1 && !o.target ? this : (r._groups.push({
            elements: this,
            options: o
        }), r._apply(this, o), this);
    };
    r.version = "0.7.0", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, 
    r._afterUpdate = null, r._rows = a, r._parse = i, r._parseOptions = n, r._apply = function(e, o) {
        var s = n(o), h = t(e), l = [ h ], c = t(window).scrollTop(), p = t("html").outerHeight(!0), d = h.parents().filter(":hidden");
        return d.each(function() {
            var e = t(this);
            e.data("style-cache", e.attr("style"));
        }), d.css("display", "block"), s.byRow && !s.target && (h.each(function() {
            var e = t(this), o = e.css("display");
            "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), 
            e.css({
                display: o,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden"
            });
        }), l = a(h), h.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "");
        })), t.each(l, function(e, o) {
            var a = t(o), n = 0;
            if (s.target) n = s.target.outerHeight(!1); else {
                if (s.byRow && a.length <= 1) return void a.css(s.property, "");
                a.each(function() {
                    var e = t(this), o = e.attr("style"), i = e.css("display");
                    "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block");
                    var a = {
                        display: i
                    };
                    a[s.property] = "", e.css(a), e.outerHeight(!1) > n && (n = e.outerHeight(!1)), 
                    o ? e.attr("style", o) : e.css("display", "");
                });
            }
            a.each(function() {
                var e = t(this), o = 0;
                s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += i(e.css("border-top-width")) + i(e.css("border-bottom-width")), 
                o += i(e.css("padding-top")) + i(e.css("padding-bottom"))), e.css(s.property, n - o + "px"));
            });
        }), d.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null);
        }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)), 
        this;
    }, r._applyDataApi = function() {
        var e = {};
        t("[data-match-height], [data-mh]").each(function() {
            var o = t(this), i = o.attr("data-mh") || o.attr("data-match-height");
            i in e ? e[i] = e[i].add(o) : e[i] = o;
        }), t.each(e, function() {
            this.matchHeight(!0);
        });
    };
    var s = function(e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function() {
            r._apply(this.elements, this.options);
        }), r._afterUpdate && r._afterUpdate(e, r._groups);
    };
    r._update = function(i, a) {
        if (a && "resize" === a.type) {
            var n = t(window).width();
            if (n === e) return;
            e = n;
        }
        i ? -1 === o && (o = setTimeout(function() {
            s(a), o = -1;
        }, r._throttle)) : s(a);
    }, t(r._applyDataApi), t(window).bind("load", function(t) {
        r._update(!1, t);
    }), t(window).bind("resize orientationchange", function(t) {
        r._update(!0, t);
    });
});