// made by Costache Madalin (lllll llll)
// discord: costache madalin#8472

//update 15.07.2021 added AM construction, created clusters, using mass request resources feature


//https://skalman.github.io/UglifyJS-online/
var backgroundColor = "#32313f",
    borderColor = "#3e6147",
    headerColor = "#202825",
    titleColor = "#ffffdf",
    headerColorEven = "#2F4F4F",
    headerWood = "#001a33",
    headerWoodEven = "#002e5a",
    headerStone = "#3b3b00",
    headerStoneEven = "#626200",
    headerIron = "#1e003b",
    headerIronEven = "#3c0076",
    countApiKey = "resource_balancer",
    countNameSpace = "madalinoTribalWarsScripts";
if ("undefined" != typeof TWMap) var originalSpawnSector = TWMap.mapHandler.spawnSector;
var translations = {
	hu_HU: {
        "today at": "ma ekkor",
        "tomorrow at": "holnap ekkor",
        on: "on"
    },
    en_DK: {
        "today at": "today at",
        "tomorrow at": "tomorrow at",
        on: "on"
    },
    en_US: {
        "today at": "today at",
        "tomorrow at": "tomorrow at",
        on: "on"
    },
    pt_PT: {
        "today at": "hoje Г s",
        "tomorrow at": "amanhГЈ Г s",
        on: "a"
    },
    pt_BR: {
        "today at": "hoje Г s",
        "tomorrow at": "amanhГЈ Г s",
        on: "a"
    },
    es_ES: {
        "today at": "hoy a las",
        "tomorrow at": "maГ±ana a las",
        on: "el"
    },
    ro_RO: {
        "today at": "astДѓzi",
        "tomorrow at": "mГўine",
        on: "data"
    }
};

function addStyle() {
    let e = "\n    .shadow20 {\n    text-shadow: 0 0 4px black, 0 0 4px black, 0 0 4px black, 0 0 4px black, 0 0 4px black;\n    }\n\n    ",
        t = document.head || document.getElementsByTagName("head")[0],
        n = document.createElement("style");
    t.appendChild(n), n.type = "text/css", n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e))
}

function createMainInterface() {
    if (html_info = `\n    <div id="div_container" class="ui-widget-content div_remove" style="width:850px;background-color:${backgroundColor};cursor:move;z-index:50;">\n        <div class="close-btn"  onclick="$('#div_container').remove()" style="position:absolute;top:10px;right: 10px;"><b><a href=#><font color="${titleColor}">X</font></b></a></div>\n        <div class="close-btn btn_close"  onclick="$('#div_tables, #table_main').toggle(500)" style="position:absolute;top:10px;right: 35px;"><b><a href=#><font color="${titleColor}">-</font></b></a></div>\n\n        <h2><center style="margin:10px"><u><font color="${titleColor}">Nyersanyag kiegyenlítő</font></u></center></h2>\n        <center>\n            <table id="table_main"  border="1" style="width: 50%;background-color:${backgroundColor};border-color:${borderColor}">\n                <tr>\n                    <td style="text-align:center; width:auto; background-color:${headerColor}" >\n                        <center style="margin:5px"><font color="${titleColor}">tartalék kereskedők</font></center>\n                    </td>\n                    <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                    <center style="margin:5px">\n                        <div style="display:flex">\n                            <div><center><input type="number" id="nr_merchants_reserve" style="text-align:center;" min="0" max="10000" placeholder="15" value="0"></center></div>\n                            <div style="margin-left:5px"><center style="margin:1px"><a href="#" onclick="UI.InfoMessage('Mennyi kereskedők maradjanak otthon tartalékban',4000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></center></div>\n                        </div>\n                    </center>\n                    </td>\n                </tr> \n                <tr>\n                    <td style="text-align:center; width:auto; background-color:${headerColor}" >\n                        <center style="margin:5px"><font color="${titleColor}">építési tartalék[óra]</font></center>\n                    </td>\n                    <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                    <center style="margin:5px">\n                        <div style="display:flex">\n                            <div><center><input type="number" id="time_construction" style="text-align:center;" min="0" max="10000" placeholder="0" value="0"></center></div>\n                            <div style="margin-left:5px"><center style="margin:1px"><a href="#" onclick="UI.InfoMessage(\`<p>itt megadhatod hogy hány órára legyen még nyersanyag hagyva a falukban, amivel építkezni lehet még\n</p>\n                                    <p> a fiókkezelődnek aktívnak kell lennie, és az adott faluhoz beállított/aktív építési sablon kell legyen hozzárendelve,\n                                    ellenkező esetben a beállítás ignorálva lesz \`,15000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></center></div>\n                        </div>\n                    </center>\n                    </td>\n                </tr> \n\n                <tr>\n                    <td style="text-align:center; width:auto; background-color:${headerColor}" >\n                        <center style="margin:5px"><font color="${titleColor}">elosztási tényező[0-1]</font></center>\n                    </td>\n                    <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                    <center style="margin:5px">\n                        <div style="display:flex">\n                            <div><center><input type="number" id="nr_average_factor" style="text-align:center;" min="0" max="10000" placeholder="1" value="1"></center></div>\n                            <div style="margin-left:5px"><center style="margin:1px"><a href="#" onclick="UI.InfoMessage(\`<p>ha a tényező 0, akkor a nyersanyagok csak az építkezési folyamatok fenntartásához lesznek postázva(fiókkezelő alapján)\n</p>\n                            <p>ha a tényező 1, akkor a nyersanyagok egyenlően lesznek elosztva minden faludban, mindenütt egyenlő mennyiségű nyersayanag lesz a végén.\n</p>\n                            <p>ha a tényező pld. 0.2, akkor a falunkénti átlag nyersanyag készlet 20%-ra lesznek feltötve a falvak, ami a fiókkezelős építkezést fennttarthatja</p>\`,20000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></center></div>\n                        </div>\n                    </center>\n                    </td>\n                </tr>\n\n                <tr>\n                    <td style="text-align:center; width:auto; background-color:${headerColor}" >\n                        <center style="margin:5px"><font color="${titleColor}">csoportok száma</font></center>\n                    </td>\n                    <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                    <center style="margin:5px">\n                        <div style="display:flex">\n                            <div><center><input type="number" id="nr_clusters" style="text-align:center;" min="0" max="10000" placeholder="1" value="1"></center></div>\n                            <div style="margin-left:5px"><center style="margin:1px"><a href="#" onclick="UI.InfoMessage(\`<p>ha 1re van állítva akkor minden falut egy csoportként kezel\n</p>\n                            <p>több csoportszám megadásánál, a falukat ennyi részre csoportosítja, és minden csoportot külön kezel, az azokban található nyersanyag átlagok és a fenti beállítások alapján. Több csoport esetén a szállítási idők minimalizálhatóak\n</p>\n                            <p>minden futtatás alkalmával a csoportok randomilag lesznek összeszedve \n</p>\n                            <p>ha térképen futtatjuk, akkor látni fogjuk hogy mennyi csoportra volt osztva az állomány és hogy melyik mennyi nyersit küldött illetve kapott\n</p>\`,20000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></center></div>\n                        </div>\n                    </center>\n                    </td>\n                </tr>\n\n                <tr hidden id="tr_merchant_capacity">\n                    <td style="text-align:center; width:auto; background-color:${headerColor}" >\n                        <center style="margin:5px"><font color="${titleColor}">merchant capacity</font></center>\n                    </td>\n                    <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                    <center style="margin:5px">\n                        <div style="display:flex">\n                            <div><center><input type="number" id="merchant_capacity" style="text-align:center;" min="0" max="10000" placeholder="1000" value='1000'></center></div>\n                            <div style="margin-left:5px"><center style="margin:1px"><a href="#" onclick="UI.InfoMessage('állítsd be a kereskedők kapacitását. 1000 vagy 1500',3000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></center></div>\n                        </div>\n                    </center>\n                    </td>\n                </tr> \n            </table>\n        </center>\n        <center>\n            <input class="btn evt-confirm-btn btn-confirm-yes" type="button" onclick="balancingResources()" style="margin:10px" value="start">\n        </center>\n\n        <div id="div_tables" hidden>\n            <center><div id="table_stats" style="width:100%"></div></center><br>\n            <center><div id="table_view" style="height:500px;width:100%;overflow:auto"></div></center>\n        </div>\n        \n    </div>\n    `, $("#div_container").remove(), $("#contentContainer").eq(0).prepend(html_info), $("#mobileContent").eq(0).prepend(html_info), "desktop" == game_data.device && ($("#div_container").css("position", "fixed"), $("#div_container").draggable()), "pt_PT" == game_data.locale && $("#tr_merchant_capacity").show(), null != localStorage.getItem(game_data.world + "settings_resources_balancer2")) {
        let e = JSON.parse(localStorage.getItem(game_data.world + "settings_resources_balancer2"));
        $("#div_container input[type=number]").each(function(t, n) {
            this.value = e[t]
        })
    }
    $("#div_container input[type=number]").on("click input change", () => {
        console.log("save settings");
        let e = [];
        $("#div_container input[type=number]").each(function() {
            var t = this.value;
            e.push(t)
        });
        let t = JSON.stringify(e),
            n = localStorage.getItem(game_data.world + "settings_resources_balancer2");
        console.log(t), console.log(n), t != n && localStorage.setItem(game_data.world + "settings_resources_balancer2", t)
    })
}
async function balancingResources() {
    let e = parseFloat(document.getElementById("time_construction").value),
        t = parseFloat(document.getElementById("nr_average_factor").value),
        n = parseInt(document.getElementById("nr_merchants_reserve").value),
        o = parseInt(document.getElementById("merchant_capacity").value),
        r = parseInt(document.getElementById("nr_clusters").value);
    n = 1 == Number.isNaN(n) || n < 0 ? 0 : n, r = 1 == Number.isNaN(r) || r < 1 ? 1 : r, e = 1 == Number.isNaN(e) || e < 0 ? 20 : e, t = 1 == Number.isNaN(t) ? 1 : t < 0 ? 0 : t > 1 ? 1 : t, o = 1 == Number.isNaN(o) ? 1e3 : o < 1e3 ? 1e3 : o > 1500 ? 1500 : o, console.log("reserveMerchants", n), console.log("time_construction_total", e), console.log("averageFactor", t), console.log("merchantCapacity", o), e *= 3600, $("#div_container").remove();
    let {
        list_production: l,
        map_farm_usage: a
    } = await getDataProduction().catch(e => alert(e)), i = await getDataIncoming().catch(e => alert(e)), s = await getResourcesForAM(e, a).catch(e => alert(e)), c = JSON.parse(JSON.stringify(l));
    console.log("list_production", l), console.log("map_farm_usage", a), console.log("map_incoming", i), console.log("map_resources_get_AM", s);
    let d = (new Date).getTime(),
        g = [];
    for (let e = 0; e < l.length; e++) g.push([parseInt(l[e].coord.split("|")[0]), parseInt(l[e].coord.split("|")[1])]);
    console.log(g);
    let m = getClusters(g, {
        numberOfClusters: r,
        maxIterations: 100
    });
    console.log("clusters", m);
    let u = [],
        p = [],
        f = new Map;
    for (let e = 0; e < m.length; e++) {
        let t = m[e].data,
            n = [],
            o = [];
        for (let r = 0; r < t.length; r++) {
            let a = t[r].join("|");
            for (let t = 0; t < l.length; t++)
                if (l[t].coord == a) {
                    n.push(l[t]), o.push(c[t]), console.log(`label_cluster: ${e}`);
                    let r = 0;
                    i.has(a) && (r = i.get(a).wood + i.get(a).stone + i.get(a).iron), f.set(l[t].id, {
                        label_cluster: e,
                        villageId: l[t].id,
                        total_resources_get: r,
                        total_resources_send: 0
                    });
                    break
                }
        }
        u.push(n), p.push(o)
    }
    console.log("list_production_cluster", u);
    let h = 0,
        _ = 0,
        y = 0,
        b = 0,
        w = 0,
        x = 0;
    for (let e = 0; e < l.length; e++) {
        let t = l[e].coord;
        i.has(t) && (l[e].wood += i.get(t).wood, l[e].stone += i.get(t).stone, l[e].iron += i.get(t).iron, l[e].wood = Math.min(l[e].wood, l[e].capacity), l[e].stone = Math.min(l[e].stone, l[e].capacity), l[e].iron = Math.min(l[e].iron, l[e].capacity)), b += l[e].wood / l.length, w += l[e].stone / l.length, x += l[e].iron / l.length, h += l[e].wood, _ += l[e].stone, y += l[e].iron
    }
    let v = [],
        C = [],
        k = 0,
        I = 0,
        M = 0,
        E = 0,
        T = 0,
        N = 0;
    for (let e = 0; e < u.length; e++) {
        console.log(`--------------cluster:${e}----------------`);
        let r = u[e],
            l = p[e],
            a = 0,
            i = 0,
            c = 0,
            d = 0,
            g = 0,
            f = 0,
            h = 0,
            _ = 0,
            y = 0,
            b = 0,
            w = 0,
            x = 0,
            $ = [],
            B = [],
            S = 0,
            D = 0,
            A = 0;
        for (let e = 0; e < r.length; e++) a += r[e].wood / r.length, i += r[e].stone / r.length, c += r[e].iron / r.length, S += r[e].wood, D += r[e].stone, A += r[e].iron;
        d = a * t, g = i * t, f = c * t;
        for (let e = 0; e < r.length; e++) {
            let t = r[e].coord,
                a = r[e].name,
                i = r[e].id,
                c = r[e].merchants;
            c -= n;
            let m = .95 * r[e].capacity,
                u = c * o,
                p = d,
                v = g,
                C = f;
            if (s.has(r[e].coord)) {
                let t = s.get(r[e].coord);
                p += t.total_wood, v += t.total_stone, C += t.total_iron, r[e].time_finished = t.time_finished
            } else r[e].time_finished = 0;
            let k = r[e].wood - Math.round(p),
                I = r[e].stone - Math.round(v),
                M = r[e].iron - Math.round(C);
            k = k < 0 ? k : l[e].wood - k > 0 ? k : l[e].wood, I = I < 0 ? I : l[e].stone - I > 0 ? I : l[e].stone, M = M < 0 ? M : l[e].iron - M > 0 ? M : l[e].iron;
            let E = 0;
            E = k > 0 ? E + k : E, E = I > 0 ? E + I : E;
            let T = u <= (E = M > 0 ? E + M : E) ? u / E : 1,
                N = 0,
                S = 0,
                D = 0,
                A = 0,
                L = 0,
                q = 0;
            N = k > 0 ? parseInt(k * T) : N, S = I > 0 ? parseInt(I * T) : S, D = M > 0 ? parseInt(M * T) : D, A = k > 0 ? A : r[e].wood + Math.abs(k) < m ? Math.abs(k) : m - r[e].wood, L = I > 0 ? L : r[e].stone + Math.abs(I) < m ? Math.abs(I) : m - r[e].stone, q = M > 0 ? q : r[e].iron + Math.abs(M) < m ? Math.abs(M) : m - r[e].iron, h += N, _ += S, y += D, b += A, w += L, x += q;
            let F = {
                    coord: t,
                    id: i,
                    name: a
                },
                H = {
                    coord: t,
                    id: i,
                    name: a
                };
            F.wood = N > 0 ? N : 0, F.stone = S > 0 ? S : 0, F.iron = D > 0 ? D : 0, (F.wood > 0 || F.stone > 0 || F.iron > 0) && $.push(F), H.wood = A > 0 ? parseInt(A) : 0, H.stone = L > 0 ? parseInt(L) : 0, H.iron = q > 0 ? parseInt(q) : 0, (H.wood > 0 || H.stone > 0 || H.iron > 0) && B.push(H)
        }
        let L = b > h ? h / b : 1,
            q = w > _ ? _ / w : 1,
            F = x > y ? y / x : 1;
        for (let e = 0; e < B.length; e++) B[e].wood = parseInt(B[e].wood * L), B[e].stone = parseInt(B[e].stone * q), B[e].iron = parseInt(B[e].iron * F);
        let H = [];
        for (let e = 0; e < B.length; e++) {
            let t = B[e].coord,
                n = B[e].id,
                r = B[e].name,
                l = 0;
            for (let t = 0; t < $.length; t++) {
                let n = calcDistance(B[e].coord, $[t].coord);
                $[t].distance = n, l = l > n ? l : n
            }
            $.sort((e, t) => e.distance > t.distance ? 1 : e.distance < t.distance ? -1 : 0);
            let a = {
                wood: 0,
                stone: 0,
                iron: 0
            };
            for (let l = 0; l < $.length; l++) {
                let i = $[l].coord,
                    s = $[l].id,
                    c = $[l].name,
                    d = $[l].wood > 0 ? Math.min(B[e].wood, $[l].wood) : 0,
                    g = $[l].stone > 0 ? Math.min(B[e].stone, $[l].stone) : 0,
                    m = $[l].iron > 0 ? Math.min(B[e].iron, $[l].iron) : 0;
                a.wood += d, a.stone += g, a.iron += m, B[e].wood -= d, B[e].stone -= g, B[e].iron -= m, $[l].wood -= d, $[l].stone -= g, $[l].iron -= m;
                let u = d + g + m,
                    p = u % o,
                    f = 1e3 == o ? 700 : 1200;
                if (p < f && (d > p ? (d -= p, u -= p) : g > p ? (g -= p, u -= p) : m > p && (m -= p, u -= p)), H.push($[l].distance), u >= f && v.push({
                        total_send: u,
                        wood: d,
                        stone: g,
                        iron: m,
                        coord_origin: i,
                        name_origin: c,
                        id_destination: n,
                        id_origin: s,
                        coord_destination: t,
                        name_destination: r,
                        distance: $[l].distance
                    }), B[e].wood + B[e].stone + B[e].iron < f) break
            }
        }
        k += h, I += _, M += y, E += b, T += w, N += x;
        let R = 0;
        for (let e = 0; e < H.length; e++) R < H[e] && (R = H[e]);
        C.push({
            nr_coords: m[e].data.length,
            center: parseInt(m[e].mean[0]) + "|" + parseInt(m[e].mean[1]),
            max_distance: R,
            avg_wood: Math.round(a),
            avg_stone: Math.round(i),
            avg_iron: Math.round(c),
            total_wood_send: h,
            total_stone_send: _,
            total_iron_send: y,
            total_wood_get: b,
            total_stone_get: w,
            total_iron_get: x,
            total_wood_cluster: S,
            total_stone_cluster: D,
            total_iron_cluster: A
        })
    }
    console.log("list_clusters_stats", C), C.sort((e, t) => e.max_distance > t.max_distance ? -1 : e.max_distance < t.max_distance ? 1 : 0);
    let B = new Map;
    for (let e = 0; e < v.length; e++) {
        let t = v[e].wood + v[e].stone + v[e].iron;
        if (t = Math.ceil(t / o), B.has(v[e].coord_origin)) {
            let n = B.get(v[e].coord_origin);
            B.set(v[e].coord_origin, t + n)
        } else B.set(v[e].coord_origin, t)
    }
    console.log("map nr merchants", B);
    for (let e = 0; e < l.length; e++) {
        let t = 0;
        B.get(l[e].coord) && (t = B.get(l[e].coord)), l[e].merchantAvailable = l[e].merchants - t
    }
    let S = {};
    S.avg_wood = Math.round(b), S.avg_stone = Math.round(w), S.avg_iron = Math.round(x), S.total_wood_send = Math.round(k), S.total_stone_send = Math.round(I), S.total_iron_send = Math.round(M), S.total_wood_get = Math.round(E), S.total_stone_get = Math.round(T), S.total_iron_get = Math.round(N), S.total_wood_home = Math.round(h), S.total_stone_home = Math.round(_), S.total_iron_home = Math.round(y);
    for (let e = 0; e < l.length; e++)
        for (let t = 0; t < v.length; t++) l[e].coord == v[t].coord_destination ? (l[e].wood += v[t].wood, l[e].stone += v[t].stone, l[e].iron += v[t].iron) : l[e].coord == v[t].coord_origin && (l[e].wood -= v[t].wood, l[e].stone -= v[t].stone, l[e].iron -= v[t].iron), l[e].result_wood = l[e].wood - Math.round(b), l[e].result_stone = l[e].stone - Math.round(w), l[e].result_iron = l[e].iron - Math.round(x), l[e].result_total = l[e].result_wood + l[e].result_stone + l[e].result_iron;
    l.sort((e, t) => e.result_total > t.result_total ? 1 : e.result_total < t.result_total ? -1 : 0);
    let D = new Map;
    for (let e = 0; e < v.length; e++) {
        let t = v[e].id_destination,
            n = v[e].id_origin,
            o = `resource[${n}][wood]`,
            r = `resource[${n}][stone]`,
            l = `resource[${n}][iron]`,
            a = {};
        if (D.has(t)) {
            let n = D.get(t);
            n.send_resources[o] = v[e].wood, n.send_resources[r] = v[e].stone, n.send_resources[l] = v[e].iron, n.total_send += v[e].total_send, n.total_wood += v[e].wood, n.total_stone += v[e].stone, n.total_iron += v[e].iron, n.distance = Math.max(n.distance, v[e].distance), D.set(t, n)
        } else a[o] = v[e].wood, a[r] = v[e].stone, a[l] = v[e].iron, D.set(t, {
            target_id: t,
            coord_destination: v[e].coord_destination,
            name_destination: v[e].name_destination,
            send_resources: a,
            total_send: v[e].total_send,
            total_wood: v[e].wood,
            total_stone: v[e].stone,
            total_iron: v[e].iron,
            distance: v[e].distance
        });
        if (f.has(t)) {
            let n = f.get(t);
            n.total_resources_get += v[e].wood + v[e].stone + v[e].iron, f.set(t, n)
        }
        if (f.has(n)) {
            let t = f.get(n);
            t.total_resources_send += v[e].wood + v[e].stone + v[e].iron, f.set(n, t)
        }
    }
    let A = Array.from(D.entries()).map(e => e[1]);
    A.sort((e, t) => e.total_send > t.total_send ? -1 : e.total_send < t.total_send ? 1 : 0), console.log("list_production", l), console.log("list_launches", v), console.log("list_launches_mass", A), console.log("map_draw_on_map", f);
    let L = (new Date).getTime();
    if (console.log("time process: " + (L - d)), createMainInterface(), $("#div_tables").show(), createTable(A, S, l, C), "undefined" != typeof TWMap) {
        console.log("map page"), document.getElementById("map_container").remove(), TWMap.mapHandler.spawnSector = originalSpawnSector;
        let e = [];
        for (let t = 0; t < m.length; t++) {
            let t = getRandomColor(.2);
            e.push(t)
        }
        console.log(e), addInfoOnMap(f, e), TWMap.init()
    }
}

function hitCountApi() {
    $.getJSON(`https://api.countapi.xyz/hit/${countNameSpace}/${countApiKey}`, e => {
        console.log(`This script has been run ${e.value} times`)
    })
}

function getDataProduction() {
    return new Promise((e, t) => {
        let n = game_data.link_base_pure + "overview_villages&mode=prod";
        document.body.innerHTML += `<div id='page_info' hidden>${httpGet(n)}</div>`;
        let o = [];
        if (document.getElementById("page_info").getElementsByClassName("vis")[1].getElementsByTagName("select").length > 0) Array.from(document.getElementById("page_info").getElementsByClassName("vis")[1].getElementsByTagName("select")[0]).forEach(function(e) {
            o.push(e.value)
        }), o.pop();
        else if (document.getElementById("page_info").getElementsByClassName("paged-nav-item").length > 0) {
            let e = 0;
            Array.from(document.getElementById("page_info").getElementsByClassName("paged-nav-item")).forEach(function(t) {
                let n = t.href;
                n = n.split("page=")[0] + "page=" + e, e++, o.push(n)
            })
        } else o.push(n);
        o = o.reverse();
        let r = [],
            l = new Map;
        ! function n(a) {
            let i;
            i = a.length > 0 ? a.pop() : "stop", console.log(i);
            let s = (new Date).getTime();
            a.length >= 0 && "stop" != i ? $.ajax({
                url: i,
                method: "get",
                success: e => {
                    document.body.innerHTML += `<div id="info_html" hidden>${e}</div>`;
                    let t = Array.from($("#info_html").find(".row_a, .row_b"));
                    for (let e = 0; e < t.length; e++) {
                        let n = t[e].getElementsByClassName("quickedit-vn")[0].innerText,
                            o = t[e].getElementsByClassName("quickedit-vn")[0].innerText.match(/[0-9]{1,3}\|[0-9]{1,3}/)[0],
                            a = t[e].getElementsByClassName("quickedit-vn")[0].getAttribute("data-id"),
                            i = parseInt(t[e].getElementsByClassName("wood")[0].innerText.replace(".", "")),
                            s = parseInt(t[e].getElementsByClassName("stone")[0].innerText.replace(".", "")),
                            c = parseInt(t[e].getElementsByClassName("iron")[0].innerText.replace(".", "")),
                            d = parseInt(t[e].querySelector("a[href*='market']").innerText.split("/")[0]),
                            g = parseInt(t[e].querySelector("a[href*='market']").innerText.split("/")[1]),
                            m = parseInt(t[e].children[4].innerText),
                            u = parseInt(t[e].children[2].innerText.replace(".", "")),
                            p = parseInt(t[e].children[6].innerText.split("/")[0]) / parseInt(t[e].children[6].innerText.split("/")[1]),
                            f = {
                                coord: o,
                                id: a,
                                wood: i,
                                stone: s,
                                iron: c,
                                name: n,
                                merchants: d,
                                merchants_total: g,
                                capacity: m,
                                points: u
                            };
                        r.push(f), l.set(o, p)
                    }
                    document.getElementById("info_html").remove();
                    let i = (new Date).getTime() - s;
                    console.log("wait: " + i), window.setTimeout(function() {
                        n(o), UI.SuccessMessage("get production page: " + a.length)
                    }, 200 - i)
                },
                error: e => {
                    t(e)
                }
            }) : (document.getElementById("page_info").remove(), UI.SuccessMessage("done"), e({
                list_production: r,
                map_farm_usage: l
            }))
        }(o)
    })
}

function getDataIncoming() {
    return new Promise((e, t) => {
        let n = game_data.link_base_pure + "overview_villages&mode=trader&type=inc";
        document.body.innerHTML += `<div id='page_info' hidden>${httpGet(n)}</div>`;
        let o = [];
        if (document.getElementById("page_info").getElementsByClassName("vis")[1].getElementsByTagName("select").length > 0) Array.from(document.getElementById("page_info").getElementsByClassName("vis")[1].getElementsByTagName("select")[0]).forEach(function(e) {
            o.push(e.value)
        }), o.pop();
        else if (document.getElementById("page_info").getElementsByClassName("paged-nav-item").length > 0) {
            let e = 0;
            Array.from(document.getElementById("page_info").getElementsByClassName("paged-nav-item")).forEach(function(t) {
                let n = t.href;
                n = n.split("page=")[0] + "page=" + e, e++, o.push(n)
            })
        } else o.push(n);
        o = o.reverse();
        let r = new Map;
        ! function n(l) {
            let a;
            a = l.length > 0 ? l.pop() : "stop", console.log(a);
            let i = (new Date).getTime();
            l.length >= 0 && "stop" != a ? $.ajax({
                url: a,
                method: "get",
                success: e => {
                    document.body.innerHTML += `<div id="info_html" hidden>${e}</div>`;
                    let t = Array.from($("#info_html").find(".row_a, .row_b"));
                    for (let e = 0; e < t.length; e++) {
                        let n = t[e].children[4].innerText.match(/[0-9]{1,3}\|[0-9]{1,3}/)[0],
                            o = parseInt($(t[e]).find(".wood").parent().text().replace(".", "")),
                            l = parseInt($(t[e]).find(".stone").parent().text().replace(".", "")),
                            a = parseInt($(t[e]).find(".iron").parent().text().replace(".", "")),
                            i = {
                                wood: o = 1 == Number.isNaN(o) ? 0 : o,
                                stone: l = 1 == Number.isNaN(l) ? 0 : l,
                                iron: a = 1 == Number.isNaN(a) ? 0 : a
                            };
                        if (r.has(n)) {
                            let e = r.get(n);
                            e.wood += o, e.stone += l, e.iron += a, r.set(n, e)
                        } else r.set(n, i)
                    }
                    document.getElementById("info_html").remove();
                    let a = (new Date).getTime() - i;
                    console.log("wait: " + a), window.setTimeout(function() {
                        n(o), UI.SuccessMessage("get incoming page: " + l.length)
                    }, 200 - a)
                },
                error: e => {
                    t(e)
                }
            }) : (document.getElementById("page_info").remove(), UI.SuccessMessage("done"), e(r))
        }(o)
    })
}

function httpGet(e) {
    var t = new XMLHttpRequest;
    return t.open("GET", e, !1), t.send(null), t.responseText
}

function calcDistance(e, t) {
    let n = parseInt(e.split("|")[0]),
        o = parseInt(e.split("|")[1]),
        r = parseInt(t.split("|")[0]),
        l = parseInt(t.split("|")[1]);
    return Math.sqrt((n - r) * (n - r) + (o - l) * (o - l))
}
async function createTable(e, t, n, o) {
    let r = `\n        <table  class="" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">\n        <thead>\n        <tr>\n            <td style="text-align:center; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font color="${titleColor}">NO</font></center>\n            </td>\n            <td style="text-align:center; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font color="${titleColor}">célpont</font></center>\n            </td>\n            <td style="text-align:center; width:auto; background-color:${headerColor}">\n                <center style="margin:5px"><a href="#" id="sort_distance"><font color="${titleColor}" >max távolság</font></a></center>\n            </td>\n            <td style="text-align:center; width:auto; background-color:${headerColor}">\n                <center style="margin:5px"><a href="#" id="sort_total"><font color="${titleColor}">összesen kap</font></a></center>\n            </td>\n            <td style="text-align:center; width:auto; background-color:${headerColor}">\n                <center style="margin:5px"><a href="#" id="sort_wood"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/wood.png"/></a></center>\n            </td>\n            <td style="text-align:center; width:auto; background-color:${headerColor}">\n                <center style="margin:5px"><a href="#" id="sort_stone"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/stone.png"/></a></center>\n            </td>\n            <td style="text-align:center; width:auto; background-color:${headerColor}">\n                <center style="margin:5px"><a href="#" id="sort_iron"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/iron.png"/></a></center>\n            </td>\n            <td style="text-align:center; width:auto; background-color:${headerColor}">\n                <center style="margin:5px"><font color="${titleColor}">küldés</font></center>\n            </td>                    \n        </tr>\n        </thead>\n        <tbody>`;
    for (let t = 0; t < e.length; t++) {
        let n = e[t].target_id,
            o = e[t].total_wood,
            l = e[t].total_stone,
            a = e[t].total_iron,
            i = (e[t].id_origin, JSON.stringify(e[t].send_resources)),
            s = t % 2 == 0 ? headerColor : headerColorEven;
        r += `\n            <tr id="delete_row" >\n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <center style="margin:5px"><font color="${titleColor}">${t+1}</font></center>\n                </td>            \n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <a href="${game_data.link_base_pure}info_village&id=${e[t].target_id}"><center><font color="${titleColor}">${e[t].name_destination}</font></center></a>\n                </td>\n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <center style="margin:5px"><font color="${titleColor}">${e[t].distance.toFixed(1)}</font></center>\n                </td>\n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <center style="margin:5px"><b><font color="${titleColor}">${formatNumber(e[t].total_send)}</font></b></center>\n                </td>\n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <center style="margin:5px"><font color="${titleColor}">${formatNumber(o)}</font></center>\n                </td>\n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <center style="margin:5px"><font color="${titleColor}">${formatNumber(l)}</font></center>\n                </td>\n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <center style="margin:5px"><font color="${titleColor}">${formatNumber(a)}</font></center>\n                </td>\n                <td style="text-align:center; width:auto; background-color:${s}" >\n                    <center style="margin:5px"><input class="btn btn_send" target_id="${n}" data='${i}'  type="button" value="küldés"></center>\n                </td>\n            </tr>`
    }
    r += "\n            </tbody>\n        </table>", document.getElementById("table_view").innerHTML = r, $(".btn_send").on("click", async e => {
        if (0 == $(e.target).is(":disabled")) {
            let t = $(e.target).attr("target_id"),
                n = JSON.parse($(e.target).attr("data"));
            console.log(t, n), $(".btn_send").attr("disabled", !0);
            let o = (new Date).getTime();
            sendResources(t, n);
            let r = (new Date).getTime() - o;
            window.setTimeout(() => {
                $(e.target).closest("#delete_row").remove(), $(".btn_send").attr("disabled", !1)
            }, 200 - r)
        }
    });
    let l = `\n        <table id="table_stats"  border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">\n        <tr>\n            <td style="text-align:left; width:200px; background-color:${headerColor}" >\n       \n            <div  style="display:flex;margin-left:25px">\n                <div><center style="margin:5px"><input class="btn evt-confirm-btn btn-confirm-yes" id="btn_result" type="button" value="eredmények"></center></div>\n                <div><center style="margin:5px"><input class="btn evt-confirm-btn btn-confirm-yes" id="btn_cluster" type="button" value="csoportok"></center></div>\n            </div>\n          \n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/wood.png"/></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/stone.png"/></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/iron.png"/></center>\n            </td>\n        </tr>\n        <tr>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">teljes </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_wood_home)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_stone_home)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_iron_home)} </font></center>\n            </td>\n        </tr>\n        <tr>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">átlag </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.avg_wood)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.avg_stone)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.avg_iron)} </font></center>\n            </td>\n        </tr>\n        <tr>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">többlet </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_wood_send)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_stone_send)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_iron_send)} </font></center>\n            </td>\n        </tr>\n        <tr>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">hiány </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_wood_get)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_stone_get)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${headerColor}" >\n                <center style="margin:5px"><font  color="${titleColor}">${formatNumber(t.total_iron_get)} </font></center>\n            </td>\n        </tr>\n\n    </table>\n    `;
    document.getElementById("table_stats").innerHTML = l, $("#btn_result").on("click", () => {
        createTableResults(n)
    }), $("#btn_cluster").on("click", () => {
        createTableClusters(o)
    }), document.getElementById("sort_distance").addEventListener("click", () => {
        e.sort((e, t) => parseFloat(e.distance) > parseFloat(t.distance) ? 1 : parseFloat(e.distance) < parseFloat(t.distance) ? -1 : 0), document.getElementById("table_stats").innerHTML = "", createTable(e, t, n, o)
    }), document.getElementById("sort_total").addEventListener("click", () => {
        e.sort((e, t) => e.total_send > t.total_send ? -1 : e.total_send < t.total_send ? 1 : 0), document.getElementById("table_view").innerHTML = "", createTable(e, t, n, o)
    }), document.getElementById("sort_wood").addEventListener("click", () => {
        e.sort((e, t) => e.total_wood > t.total_wood ? -1 : e.total_wood < t.total_wood ? 1 : 0), document.getElementById("table_view").innerHTML = "", createTable(e, t, n, o)
    }), document.getElementById("sort_stone").addEventListener("click", () => {
        e.sort((e, t) => e.total_stone > t.total_stone ? -1 : e.total_stone < t.total_stone ? 1 : 0), document.getElementById("table_view").innerHTML = "", createTable(e, t, n, o)
    }), document.getElementById("sort_iron").addEventListener("click", () => {
        e.sort((e, t) => e.total_iron > t.total_iron ? -1 : e.total_iron < t.total_iron ? 1 : 0), document.getElementById("table_view").innerHTML = "", createTable(e, t, n, o)
    }), document.getElementsByClassName("btn_send").length > 0 && document.getElementsByClassName("btn_send")[0].focus(), window.onkeydown = function(e) {
        13 == e.which && document.getElementsByClassName("btn_send").length > 0 && document.getElementsByClassName("btn_send")[0].click()
    }
}

function formatNumber(e) {
    return (new Intl.NumberFormat).format(e)
}

function createTableResults(e) {
    let t = `\n    <center><div id="table_results" style="height:800px;width:800px;overflow:auto">\n    <table id="table_stats"  border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor};border-collapse: collapse;">\n    <tr>\n        <th style="text-align:left; width:auto; background-color:${headerColor};position: sticky;top:0" >\n            <center style="margin:10px"><font  color="${titleColor}">koordináta </font></center>\n        </th>\n        <th style="text-align:left; width:20px; background-color:${headerColor};position: sticky;top:0" >\n            <a href="#" id="order_points"><center style="margin:10px"><font  color="${titleColor}">pontok</font></center></a>\n        </th>\n        <th style="text-align:left; width:20px; background-color:${headerColor};position: sticky;top:0" >\n            <a href="#" id="order_merchants"><center style="margin:10px"><font  color="${titleColor}">kereskedők</font></center></a>\n        </th>\n        <th style="text-align:left; width:20px; background-color:${headerColor};position: sticky;top:0">\n            <center style="margin:5px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/main.png"/>\n                <a href="#" id="order_hours"><font  color="${titleColor}">[óra] </font> </a>\n            </center>\n        </th>\n        <th style="text-align:left; width:auto; background-color:${headerColor};position: sticky;top:0" colspan="2" >\n            <a href="#" class="order_deficit">\n                <center style="margin:10px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/wood.png"/></center>\n            </a>\n            </th>\n        <th style="text-align:left; width:auto; background-color:${headerColor};position: sticky;top:0" colspan="2"> \n            <a href="#" class="order_deficit">\n                <center style="margin:10px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/stone.png"/></center>\n            </a>\n        </th>\n        <th style="text-align:left; width:auto; background-color:${headerColor};position: sticky;top:0" colspan="2">\n            <a href="#" class="order_deficit">\n                <center style="margin:10px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/iron.png"/></center>\n            </a>\n        </th>\n        <th style="text-align:left; width:auto; background-color:${headerColor};position: sticky;top:0" >\n            <a href="#" id="order_wh">\n                <center style="margin:10px"><img src="https://dsen.innogamescdn.com/asset/04d88c84/graphic/buildings/storage.png"/></center>\n            </a>\n        </th>\n    </tr>`;
    for (let n = 0; n < e.length; n++) {
        let o, r, l, a, i = n % 2 == 0 ? headerWood : headerWoodEven,
            s = n % 2 == 0 ? headerStone : headerStoneEven,
            c = n % 2 == 0 ? headerIron : headerIronEven,
            d = "#013e27",
            g = "#026440",
            m = "#5f0000",
            u = "#9a0000",
            p = "#202825",
            f = "#313e39";
        n % 2 == 0 ? (o = parseInt(e[n].result_wood) >= 0 ? d : m, r = parseInt(e[n].result_stone) >= 0 ? d : m, l = parseInt(e[n].result_iron) >= 0 ? d : m, a = p) : (o = parseInt(e[n].result_wood) >= 0 ? g : u, r = parseInt(e[n].result_stone) >= 0 ? g : u, l = parseInt(e[n].result_iron) >= 0 ? g : u, a = f), t += `\n        <tr >\n            <td style="text-align:left; width:auto; background-color:${a}" >\n                <a href="${game_data.link_base_pure}info_village&id=${e[n].id}"><center><font color="${titleColor}">${e[n].coord}</font></center></a>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${a}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].points)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${a}" >\n                <center style="margin:0px"><font  color="${titleColor}"><b>${e[n].merchantAvailable}</b> / ${e[n].merchants_total} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${a}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].time_finished)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${i}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].wood)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${o}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].result_wood)} </font></center>\n            </td>\n\n            <td style="text-align:left; width:auto; background-color:${s}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].stone)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${r}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].result_stone)} </font></center>\n            </td>\n\n            <td style="text-align:left; width:auto; background-color:${c}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].iron)} </font></center>\n            </td>\n            <td style="text-align:left; width:auto; background-color:${l}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].result_iron)} </font></center>\n            </td>\n\n            <td style="text-align:left; width:auto; background-color:${a}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].capacity)} </font></center>\n            </td>\n        </tr>\n        `
    }
    t += "\n    </table>\n    </div></center>\n    ", Dialog.show("content", t), $("#order_points").on("click", () => {
        e.sort((e, t) => e.points > t.points ? 1 : e.points < t.points ? -1 : 0), console.log("order by points"), $(".popup_box_close").click(), createTableResults(e)
    }), $("#order_merchants").on("click", () => {
        e.sort((e, t) => e.merchantAvailable > t.merchantAvailable ? 1 : e.merchantAvailable < t.merchantAvailable ? -1 : 0), console.log("order by merchants"), $(".popup_box_close").click(), createTableResults(e)
    }), $("#order_hours").on("click", () => {
        e.sort((e, t) => e.time_finished > t.time_finished ? -1 : e.time_finished < t.time_finished ? 1 : 0), console.log("order by construction time"), console.log(e), $(".popup_box_close").click(), createTableResults(e)
    }), $(".order_deficit").on("click", () => {
        e.sort((e, t) => e.result_total > t.result_total ? 1 : e.result_total < t.result_total ? -1 : 0), console.log("order by deficit/surplus"), $(".popup_box_close").click(), createTableResults(e)
    }), $("#order_wh").on("click", () => {
        e.sort((e, t) => e.capacity > t.capacity ? 1 : e.capacity < t.capacity ? -1 : 0), console.log("order by warehouse capacity"), $(".popup_box_close").click(), createTableResults(e)
    })
}

function createTableClusters(e) {
    let t = `\n    <center><div id="table_results" style="height:800px;width:700px;overflow:auto">\n    <table id="table_stats"  border="1" style="width: 20%;background-color:${backgroundColor};border-color:${borderColor};border-collapse: collapse;">\n    <tr>\n        <th style="text-align:left; width:100%; background-color:${headerColor};position: sticky;top:0" >\n            <center style="margin:10px"><font  color="${titleColor}">NO </font></center>\n        </th>\n        <th style="text-align:left; width:100%; background-color:${headerColor};position: sticky;top:0" >\n            <center style="margin:10px"><font  color="${titleColor}">kordik/csoportok</font></center>\n        </th>\n        <th style="text-align:left; width:20px; background-color:${headerColor};position: sticky;top:0" >\n            <center style="margin:10px"><font  color="${titleColor}">csoportok közepe</font></center>\n        </th>\n        <th style="text-align:left; width:100%; background-color:${headerColor};position: sticky;top:0" >\n            <center style="margin:10px"><font  color="${titleColor}">nyersanyagok</font></center>\n        </th>\n        <th style="text-align:left; width:100%; background-color:${headerColor};position: sticky;top:0" >\n            <center style="margin:10px"><font  color="${titleColor}">max távolság</font></center>\n        </th>\n\n   \n    </tr>`;
    for (let n = 0; n < e.length; n++) {
        let o = n % 2 == 0 ? "#202825" : "#313e39";
        t += `\n        <tr >\n            <td style="text-align:left; width:100%; background-color:${o}" >\n                <center style="margin:0px"><font  color="${titleColor}">${n+1} </font></center>\n            </td>\n            <td style="text-align:left; width:100%; background-color:${o}" >\n                <center style="margin:0px"><font  color="${titleColor}">${formatNumber(e[n].nr_coords)} </font></center>\n            </td>\n            <td style="text-align:left; width:100%; background-color:${o}" >\n                <center style="margin:0px"><font  color="${titleColor}">${e[n].center} </font></center>\n            </td>\n            <td style="text-align:left; width:100%; background-color:${o}" >\n                <center>\n                <table id="table_stats"  border="1" style="width: auto;background-color:${backgroundColor};border-color:${borderColor};margin:10px">\n                    <tr>\n                        <td style="text-align:left; width:auto; background-color:${headerColorEven}" >\n                            <center style="margin:0px"><font  color="${titleColor}">típus</font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${headerColorEven}" >\n                            <center style="margin:5px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/wood.png"/></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${headerColorEven}" >\n                            <center style="margin:5px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/stone.png"/></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${headerColorEven}" >\n                            <center style="margin:5px"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/iron.png"/></center>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">összesen </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_wood_cluster)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_stone_cluster)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_iron_cluster)} </font></center>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">átlag </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].avg_wood)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].avg_stone)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].avg_iron)} </font></center>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">többlet </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_wood_send)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_stone_send)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_iron_send)} </font></center>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">hiány </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_wood_get)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_stone_get)} </font></center>\n                        </td>\n                        <td style="text-align:left; width:auto; background-color:${o}" >\n                            <center style="margin:5px"><font  color="${titleColor}">${formatNumber(e[n].total_iron_get)} </font></center>\n                        </td>\n                    </tr>\n                </table>\n                </center>\n            </td>\n\n            <td style="text-align:left; width:100%; background-color:${o}" >\n                <center style="margin:0px"><font  color="${titleColor}">${e[n].max_distance.toFixed(1)} </font></center>\n            </td>\n        </tr>\n        `
    }
    t += "\n    </table>\n    </div></center>\n    ", Dialog.show("content", t)
}

function sendResources(e, t) {
    let n = {
        village: e,
        ajaxaction: "call",
        h: window.csrf_token
    };
    TribalWars.post("market", n, t, function(e) {
        console.log(e), UI.SuccessMessage(e.success, 1e3)
    }, function(e) {
        console.log(e)
    })
}
async function getResourcesForAM(e, t) {
    let {
        map_construction_templates: n,
        map_coord_templates: o
    } = await getTemplates().catch(e => alert(e)), r = await getDataBuildings().catch(e => alert(e)), l = getConstantsTwBuildings();
    return console.log("map_construction_templates", n), console.log("map_coord_templates", o), console.log("map_buildings", r), console.log("map_constants_buildings", l), new Promise((a, i) => {
        0 == e && a(new Map);
        let s = new Map;
        Array.from(r.keys()).forEach(e => {
            e.includes("_time_queued") && s.set(e.replace("_time_queued", ""), {
                total_wood: 0,
                total_stone: 0,
                total_iron: 0,
                time_finished: Math.round(r.get(e) / 3600)
            })
        }), Array.from(o.keys()).forEach(a => {
            let i = a,
                c = r.get(i + "_time_queued"),
                d = o.get(i),
                g = n.get(d);
            if (r.get(i + "_farm") < 30 && t.get(i) >= .99) {
                let e = calculateTimeAndResConstruction(r.get(i + "_main"), r.get(i + "_farm"), l.get("farm")),
                    t = e[0],
                    n = e[1],
                    o = e[2],
                    a = e[3];
                c += t, s.set(i, {
                    total_wood: n,
                    total_stone: o,
                    total_iron: a,
                    time_finished: Math.round(c / 3600)
                })
            }
            for (let t = 0; t < g.length; t++) {
                let n = g[t].name,
                    o = i + "_" + n,
                    a = g[t].level_absolute,
                    d = r.get(o);
                if (a > d) {
                    let t = a - d;
                    for (let o = 0; o < t; o++) {
                        d++;
                        let t = calculateTimeAndResConstruction(r.get(i + "_main"), d, l.get(n)),
                            o = t[0],
                            a = t[1],
                            g = t[2],
                            m = t[3];
                        if (c += o, s.has(i)) {
                            let e = s.get(i);
                            e.total_wood += a, e.total_stone += g, e.total_iron += m, e.time_finished = Math.round(c / 3600), s.set(i, e)
                        } else s.set(i, {
                            total_wood: a,
                            total_stone: g,
                            total_iron: m,
                            time_finished: Math.round(c / 3600)
                        });
                        if (c > e) break
                    }
                }
                if (c > e) break
            }
        }), a(s)
    })
}

function getTemplates() {
    return new Promise((e, t) => {
        0 == game_data.features.AccountManager.active && e({
            map_coord_templates: new Map,
            map_construction_templates: new Map
        });
        let n = game_data.link_base_pure + "am_village";
        document.body.innerHTML += `<div id='page_am' hidden>${httpGet(n)}</div>`;
        let o = [];
        if ($("#village_table").prev().find("select").length > 0) Array.from($("#village_table").prev().find("select").get(0)).forEach(function(e) {
            o.push(e.value)
        });
        else if ($("#village_table").prev().find(".paged-nav-item").length > 0) {
            for (let e = $("#village_table").prev().find(".paged-nav-item").length - 2; e >= 0; e--) {
                let t = game_data.link_base_pure + `am_village&page=${e}`;
                o.push(t)
            }
        } else o.push(n);
        o = o.reverse(), console.log(o);
        let r = new Map,
            l = new Map;
        !async function n(a) {
            let i;
            i = a.length > 0 ? a.pop() : "stop", console.log(i);
            let s = (new Date).getTime();
            if (a.length >= 0 && "stop" != i) $.ajax({
                url: i,
                method: "get",
                success: e => {
                    document.body.innerHTML += `<div id="page_am" hidden>${e}</div>`;
                    let t = Array.from($("#page_am").find(".row_a, .row_b"));
                    for (let e = 0; e < t.length; e++) {
                        let n = t[e].children[0].innerText.match(/[0-9]{1,3}\|[0-9]{1,3}/)[0],
                            o = t[e].children[1].innerText.trim();
                        "" != o && (r.set(n, o), l.set(o, 0))
                    }
                    document.getElementById("page_am").remove();
                    let i = (new Date).getTime() - s;
                    console.log("wait: " + i), window.setTimeout(function() {
                        n(o), UI.SuccessMessage("get AM construction page: " + a.length)
                    }, 200 - i)
                },
                error: e => {
                    t(e)
                }
            });
            else {
                let t = Array.from($("select[name=template]").eq(0).find("option"));
                for (let e = 0; e < t.length; e++) {
                    let n, o = game_data.link_base_pure + `am_village&mode=queue&template=${t[e].value}`;
                    if (n = e < 3 ? t[e].innerText.replaceAll("\n", "").replaceAll("\t", "").replace(/\(\w+\)/, "") : t[e].innerText.replaceAll("\n", "").replaceAll("\t", ""), l.has(n)) {
                        let e = await ajaxPromise(o);
                        document.body.innerHTML += `<div id='page_am_template' hidden>${e}</div>`;
                        let t = [];
                        Array.from($("#page_am_template .sortable_row")).forEach(e => {
                            t.push({
                                name: e.getAttribute("data-building"),
                                level_relative: parseInt($(e).find(".level_relative").text()),
                                level_absolute: parseInt($(e).find(".level_absolute").text().match(/\d+/)[0])
                            })
                        }), l.set(n, t), $("#page_am_template").remove()
                    }
                }
                document.getElementById("page_am").remove(), UI.SuccessMessage("done"), e({
                    map_coord_templates: r,
                    map_construction_templates: l
                })
            }
        }(o)
    })
}

function ajaxPromise(e) {
    return new Promise((t, n) => {
        let o = (new Date).getTime();
        $.ajax({
            url: e,
            method: "get",
            success: e => {
                let n = (new Date).getTime() - o;
                window.setTimeout(() => {
                    t(e)
                }, 200 - n)
            },
            error: e => {
                n(e)
            }
        })
    })
}

function getDataBuildings() {
    return new Promise((e, t) => {
        let n = game_data.link_base_pure + "overview_villages&mode=buildings";
        document.body.innerHTML += `<div id='page_buildings' hidden>${httpGet(n)}</div>`;
        let o = [];
        if (document.getElementById("page_buildings").getElementsByClassName("vis")[1].getElementsByTagName("select").length > 0) Array.from(document.getElementById("page_buildings").getElementsByClassName("vis")[1].getElementsByTagName("select")[0]).forEach(function(e) {
            o.push(e.value)
        }), o.pop();
        else if (document.getElementById("page_buildings").getElementsByClassName("paged-nav-item").length > 0) {
            let e = 0;
            Array.from(document.getElementById("page_buildings").getElementsByClassName("paged-nav-item")).forEach(function(t) {
                let n = t.href;
                n = n.split("page=")[0] + "page=" + e, e++, o.push(n)
            })
        } else o.push(n);
        o = o, console.log(o);
        let r = new Map;
        ! function n(l) {
            let a;
            a = l.length > 0 ? l.pop() : "stop", console.log(a);
            let i = (new Date).getTime();
            l.length >= 0 && "stop" != a ? $.ajax({
                url: a,
                method: "get",
                success: e => {
                    document.body.innerHTML += `<div id="page_buildings" hidden>${e}</div>`;
                    let t = Array.from($("#page_buildings").find(".row_a, .row_b"));
                    for (let e = 0; e < t.length; e++) {
                        let n = $(t[e]).find(".nowrap").text().match(/[0-9]{1,3}\|[0-9]{1,3}/)[0],
                            o = $(t[e]).find(".queue_icon img").last().attr("title");
                        o = null == o ? 0 : getFinishTime(o = o.split("-")[1]), r.set(n + "_time_queued", o);
                        let l = $(t[e]).find(".upgrade_building");
                        for (let e = 0; e < l.length; e++) {
                            let t = l[e].classList[1].replace("b_", ""),
                                o = parseInt(l[e].innerText),
                                a = n + "_" + t;
                            r.set(a, o)
                        }
                        let a = Array.from($(t[e]).find(".queue_icon img")).map(e => e.src.match(/\w+.png/)[0].replace(".png", ""));
                        for (let e = 0; e < a.length; e++) {
                            let t = n + "_" + a[e];
                            if (r.has(t)) {
                                let e = r.get(t);
                                r.set(t, e + 1)
                            } else r.set(t, 1)
                        }
                    }
                    document.getElementById("page_buildings").remove();
                    let a = (new Date).getTime() - i;
                    console.log("wait: " + a), window.setTimeout(function() {
                        n(o), UI.SuccessMessage("get building page: " + l.length)
                    }, 200 - a)
                },
                error: e => {
                    t(e)
                }
            }) : (document.getElementById("page_buildings").remove(), UI.SuccessMessage("done"), console.log("map_buildings heeeeeeeerere", r), e(r))
        }(o)
    })
}

function getFinishTime(e) {
    var t = "";
    let n = document.getElementById("serverDate").innerText.split("/");
    if (e.includes(lang.aea2b0aa9ae1534226518faaefffdaad.replace(" %s", ""))) t = n[1] + "/" + n[0] + "/" + n[2] + " " + e.match(/\d+:\d+/)[0];
    else if (e.includes(lang["57d28d1b211fddbb7a499ead5bf23079"].replace(" %s", ""))) {
        var o = new Date(n[1] + "/" + n[0] + "/" + n[2]);
        o.setDate(o.getDate() + 1), t = ("0" + (o.getMonth() + 1)).slice(-2) + "/" + ("0" + o.getDate()).slice(-2) + "/" + o.getFullYear() + " " + e.match(/\d+:\d+/)[0]
    } else if (e.includes(lang["0cb274c906d622fa8ce524bcfbb7552d"].split(" ")[0])) {
        var r = e.match(/\d+.\d+/)[0].split(".");
        t = r[1] + "/" + r[0] + "/" + n[2] + " " + e.match(/\d+:\d+/)[0]
    }
    t = new Date(t).getTime();
    let l = document.getElementById("serverTime").innerText,
        a = document.getElementById("serverDate").innerText.split("/");
    a = a[1] + "/" + a[0] + "/" + a[2];
    let i = new Date(a + " " + l).getTime();
    return parseInt((t - i) / 1e3)
}

function getConstantsTwBuildings() {
    if (null !== localStorage.getItem(game_data.world + "constantBuildings")) {
        let e = new Map(JSON.parse(localStorage.getItem(game_data.world + "constantBuildings")));
        return console.log("constant building world already exist"), e
    } {
        let e = httpGet("/interface.php?func=get_building_info");
        document.body.innerHTML += `<div id='load_html' hidden>${e}</div>`;
        let t = new Map,
            n = document.getElementsByTagName("config")[0].children;
        for (let e = 0; e < n.length; e++) {
            let o = n[e].tagName.toLowerCase(),
                r = Number(n[e].getElementsByTagName("wood")[0].innerText),
                l = Number(n[e].getElementsByTagName("stone")[0].innerText),
                a = Number(n[e].getElementsByTagName("iron")[0].innerText),
                i = Number(n[e].getElementsByTagName("wood_factor")[0].innerText),
                s = Number(n[e].getElementsByTagName("stone_factor")[0].innerText),
                c = Number(n[e].getElementsByTagName("iron_factor")[0].innerText),
                d = Number(n[e].getElementsByTagName("build_time")[0].innerText),
                g = Number(n[e].getElementsByTagName("build_time_factor")[0].innerText);
            t.set(o, {
                wood: r,
                stone: l,
                iron: a,
                wood_factor: i,
                stone_factor: s,
                iron_factor: c,
                build_time: d,
                build_time_factor: g
            })
        }
        document.getElementById("load_html").remove();
        let o = JSON.stringify(Array.from(t.entries()));
        return localStorage.setItem(game_data.world + "constantBuildings", o), console.log("save speed world"), t
    }
}

function calculateTimeAndResConstruction(e, t, n) {
    var o = Math.max(-13, t - 1 - 14 / (t - 1)),
        r = 1.18 * n.build_time * Math.pow(n.build_time_factor, o) * Math.pow(1.05, -e);
    let l = Math.round(n.wood * Math.pow(n.wood_factor, t - 1)),
        a = Math.round(n.stone * Math.pow(n.stone_factor, t - 1)),
        i = Math.round(n.iron * Math.pow(n.iron_factor, t - 1));
    return [Math.round(r), l, a, i]
}

function getClusters(e, t) {
    let n = [],
        o = 999999;
    for (let r = 0; r < 50; r++) {
        let r = insideGetCluster(e, t);
        o > r.maxDistance && (o = r.maxDistance, n = r)
    }
    return console.log("maxDistanceGlobal", o), n
}

function insideGetCluster(e, t) {
    let n = getClustersWithParams(e, t && t.numberOfClusters ? t.numberOfClusters : 1, t && t.distanceFunction ? t.distanceFunction : getDistance, t && t.vectorFunction ? t.vectorFunction : defaultVectorFunction, t && t.maxIterations ? t.maxIterations : 1e3).clusters,
        o = 0;
    for (let e = 0; e < n.length; e++) {
        let t = n[e].data;
        for (let e = 0; e < t.length; e++)
            for (let n = e + 1; n < t.length; n++) {
                let r = getDistance(t[e], t[n]);
                o = o > r ? o : r
            }
    }
    return n.maxDistance = o, n
}

function getClustersWithParams(e, t, n, o, r) {
    let l = [];
    for (let n = 0; n < t; n++) {
        let t = parseInt(Math.random() * Object.keys(e).length);
        l.push(e[t])
    }
    for (var a = createClusters(l), i = 0; i < r;) {
        initClustersData(a), assignDataToClusters(e, a, n, o), updateMeans(a, o);
        getMeansDistance(a, o, n);
        i++
    }
    return {
        clusters: a,
        iterations: []
    }
}

function defaultVectorFunction(e) {
    return e
}

function getMeansDistance(e, t, n) {
    var o = 0;
    return e.forEach(function(e) {
        e.data.forEach(function(r) {
            o += Math.pow(n(e.mean, t(r)), 2)
        })
    }), o
}

function updateMeans(e, t) {
    e.forEach(function(e) {
        updateMean(e, t)
    })
}

function updateMean(e, t) {
    for (var n = [], o = 0; o < e.mean.length; o++) n.push(getMean(e.data, o, t));
    e.mean = n
}

function getMean(e, t, n) {
    var o = 0,
        r = e.length;
    return 0 == r ? 0 : (e.forEach(function(e) {
        o += n(e)[t]
    }), o / r)
}

function assignDataToClusters(e, t, n, o) {
    e.forEach(function(e) {
        var r = findClosestCluster(o(e), t, n);
        r.data || (r.data = []), r.data.push(e)
    })
}

function findClosestCluster(e, t, n) {
    var o = {},
        r = 9999999;
    return t.forEach(function(t) {
        var l = n(t.mean, e);
        l < r && (r = l, o = t)
    }), o
}

function initClustersData(e) {
    e.forEach(function(e) {
        e.data = []
    })
}

function createClusters(e) {
    var t = [];
    return e.forEach(function(e) {
        var n = {
            mean: e,
            data: []
        };
        t.push(n)
    }), t
}

function getDistance(e, t) {
    for (var n = 0, o = 0; o < e.length; o++) n += Math.pow(e[o] - t[o], 2);
    return Math.sqrt(n)
}

function addInfoOnMap(e, t) {
    let n = !0;
    console.log("sa mor eu de nu mrge", e), TWMap.mapHandler.spawnSector = function(o, r) {
        originalSpawnSector.call(TWMap.mapHandler, o, r), console.log("spawn area map"), 1 == n && (n = !1, window.setTimeout(() => {
            let o = TWMap.map._visibleSectors;
            Object.keys(o).forEach(n => {
                let r = o[n]._elements;
                Object.keys(r).forEach(n => {
                    let o = r[n].id.match(/\d+/);
                    if (null != o && e.has(o[0])) {
                        let n = e.get(o[0]);
                        createMapInfo(n, t[n.label_cluster])
                    }
                })
            }), n = !0
        }, 50))
    }
}

function createMapInfo(e, t) {
    try {
        if (console.log(t), null == document.getElementById(`info_extra${e.villageId}`)) {
            let n = "#026440",
                o = "#E80000",
                r = document.getElementById(`map_village_${e.villageId}`),
                l = document.getElementById(`map_village_${e.villageId}`).parentElement,
                a = r.style.left,
                i = r.style.top;
            for (; null != document.getElementById(`map_icons_${e.villageId}`);) document.getElementById(`map_icons_${e.villageId}`).remove();
            null != document.getElementById(`map_cmdicons_${e.villageId}_0`) && document.getElementById(`map_cmdicons_${e.villageId}_0`).remove(), null != document.getElementById(`map_cmdicons_${e.villageId}_1`) && document.getElementById(`map_cmdicons_${e.villageId}_1`).remove();
            let s = `\n                <div class="border_info" id="info_extra${e.villageId}" style="position:absolute;left:${a};top:${i};width:51px;height:36px;z-index:3; ${`background-color:${t.colorOpacity};outline:${t.color} solid 2px`}"></div>\n                <center><font color="${titleColor}"  class="shadow20" style="position:absolute;left:${a};top:${i};width:14px;height:14px;z-index:4;margin-left:0px;; font-size: 12px">nr:${e.label_cluster} </font></center>\n                <center><font color="${n}"  class="shadow20" style="position:absolute;left:${a};top:${i};width:14px;height:14px;z-index:4;margin-left:0px;margin-top:11px; font-size: 12px">${parseInt(e.total_resources_get/1e3)}k </font></center>\n                <center><font color="${o}"  class="shadow20" style="position:absolute;left:${a};top:${i};width:14px;height:14px;z-index:4;margin-left:0px;margin-top:23px; font-size: 12px">${parseInt(e.total_resources_send/1e3)}k </font></center>\n                `;
            $(s).appendTo(l)
        }
    } catch (e) {}
}

function getRandomColor(e) {
    let t = "rgb(",
        n = "rgba(";
    for (let e = 0; e < 3; e++) {
        let e = Math.floor(255 * Math.random());
        t += e + ",", n += e + ","
    }
    return {
        color: t = t.substr(0, t.length - 1) + ")",
        colorOpacity: n = n + e + ")"
    }
}
addStyle(), createMainInterface(), hitCountApi();
