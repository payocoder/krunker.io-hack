// ==UserScript==
// @name         KrunkerVillain X by Unkn0wn_Cheats
// @namespace    Unkn0wn Cheats
// @version      1.8.9
// @description  Krunker Cheats WORKING!
// @author       Unkn0wn Cheats
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
var _0x6e02=["\x5B\x49\x6E\x6A\x65\x63\x74\x65\x64\x5D\x20\x53\x68\x6F\x75\x74\x6F\x75\x74\x20\x74\x6F\x20\x53\x74\x6F\x72\x6D\x77\x6F\x6C\x66\x50\x6C\x61\x79\x7A\x2C\x20\x48\x61\x69\x4C\x5F\x46\x72\x6F\x73\x74\x65\x64\x2C\x20\x4C\x75\x6B\x69\x65\x2C\x20\x61\x6E\x64\x20\x4D\x65\x72\x65\x6C\x74\x6A\x75\x21\x20\x43\x6F\x6E\x67\x72\x61\x67\x75\x6C\x61\x74\x69\x6F\x6E\x73\x21\x20\x54\x68\x61\x6E\x6B\x20\x79\x6F\x75\x21\x20\x4C\x61\x74\x65\x73\x74\x20\x56\x65\x72\x73\x69\x6F\x6E\x20\x43\x72\x65\x61\x74\x65\x64\x20\x62\x79\x20\x55\x6E\x6B\x6E\x30\x77\x6E\x20\x43\x68\x65\x61\x74\x73\x2E\x20\x46\x69\x78\x65\x64\x20\x41\x69\x6D\x62\x6F\x74\x2F\x45\x73\x70\x2F\x41\x6C\x6C\x20\x66\x65\x61\x74\x75\x72\x65\x73\x21\x20\x57\x6F\x72\x6B\x69\x6E\x67\x20\x32\x30\x31\x39\x20\x4E\x6F\x76\x65\x6D\x62\x65\x72\x21\x20\x57\x61\x6E\x74\x20\x61\x20\x66\x72\x65\x65\x20\x73\x68\x6F\x75\x74\x6F\x75\x74\x3F\x20\x45\x6D\x61\x69\x6C\x20\x6D\x65\x20\x77\x68\x65\x6E\x20\x74\x68\x65\x20\x68\x61\x63\x6B\x73\x20\x61\x72\x65\x20\x62\x72\x6F\x6B\x65\x6E\x20\x61\x6E\x64\x20\x69\x20\x77\x69\x6C\x6C\x20\x73\x68\x6F\x75\x74\x6F\x75\x74\x20\x79\x6F\x75\x20\x70\x6C\x75\x73\x20\x67\x69\x76\x65\x20\x75\x20\x61\x20\x66\x72\x65\x65\x20\x63\x6F\x70\x79\x20\x6F\x66\x20\x73\x63\x72\x69\x70\x74\x20\x77\x69\x74\x68\x20\x6E\x6F\x20\x6C\x69\x6E\x6B\x20\x73\x68\x6F\x72\x74\x65\x6E\x65\x72\x73\x21\x20\x4D\x79\x20\x65\x6D\x61\x69\x6C\x3A\x20\x79\x61\x62\x61\x72\x67\x40\x79\x61\x68\x6F\x6F\x2E\x63\x6F\x6D"];alert(_0x6e02[0])
(function() {
    const replace = String.prototype.replace;
    const original_call = Function.prototype.call;

    let anti_map = [];

    // hook toString to conceal all hooks
    const original_toString = Function.prototype.toString;
    let hook_toString = new Proxy(original_toString, {
        apply: function(target, _this, _arguments) {
            for (var i = 0; i < anti_map.length; i++) {
                if (anti_map[i].from === _this) {
                    return target.apply(anti_map[i].to, _arguments);
                }
            }
            return target.apply(_this, _arguments);
        }
    });
    // hide toString hook itself
    anti_map.push({from: hook_toString, to: original_toString});
    Function.prototype.toString = hook_toString;

    let conceal_function = function(original_Function, hook_Function) {
        anti_map.push({from: hook_Function, to: original_Function});
    };

    // hook Object.getOwnPropertyDescriptors to hide variables from window
    let hidden_globals = [];
    const original_getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
    let hook_getOwnPropertyDescriptors = new Proxy(original_getOwnPropertyDescriptors, {
        apply: function(target, _this, _arguments) {
            let descriptors = target.apply(_this, _arguments);
            for (var i = 0; i < hidden_globals.length; i++) {
                delete descriptors[hidden_globals[i]];
            }
            return descriptors;
        }
    });
    Object.getOwnPropertyDescriptors = hook_getOwnPropertyDescriptors;
    conceal_function(original_getOwnPropertyDescriptors, hook_getOwnPropertyDescriptors);

    let invisible_define = function(obj, key, value) {
        hidden_globals.push(key);
        Object.defineProperty(obj, key, {
            enumberable: false,
            configurable: false,
            writable: true,
            value: value
        });
    };

    let global_invisible_define = function(key, value) {
        invisible_define(window, key, value);
    };

    // we generate random keys for global variables and make it almost impossible(?)
    // for outsiders to find programatically
    let keyMap = {};
    let genKey = function() {
        // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        let a = new Uint8Array(20);
        crypto.getRandomValues(a);
        return 'hrt'+Array.from(a,x=>('0'+x.toString(16)).substr(-2)).join('');
    }

    keyMap['init'] = genKey();
    global_invisible_define(keyMap['init'], false);

    // drawVisuals gets overwritten later - place hook before anti cheat loads
    let drawVisuals = function() {};
    const original_clearRect = CanvasRenderingContext2D.prototype.clearRect;
    let hook_clearRect = new Proxy(original_clearRect, {
        apply: function(target, _this, _arguments) {
            target.apply(_this, _arguments);
            drawVisuals(_this);
        }
    });
    conceal_function(original_clearRect, hook_clearRect);
    CanvasRenderingContext2D.prototype.clearRect = hook_clearRect;

    // me, inputs, world, consts, math are objects the rest are key strings
    let hrtCheat = function(me, inputs, world, consts, math, canSee, pchObjc, objInstances, isYou, recoilAnimY, mouseDownL, mouseDownR) {
        /* re implements code that we overwrote to place hook */
        let controls = world.controls;
        if (controls.scrollDelta) {
            controls.skipScroll = controls.scrollToSwap;
            if (!controls.scrollToSwap) {
                controls.fakeKey(0x4e20,0x1);
            }
        }
        controls.scrollDelta = 0;
        controls.wSwap = 0;
        /******************************************************/

        const playerHeight = 11;
        const crouchDst = 3;
        const headScale = 2;
        const hitBoxPad = 1;
        const armScale = 1.3;
        const chestWidth = 2.6;
        const armInset = -.1;
        const playerScale = (2 * armScale + chestWidth + armInset) / 2;
        const SHOOT = 5, SCOPE = 6, xDr = 3, yDr = 2, JUMP = 7, CROUCH = 8;
        let isEnemy = function(player) {return !me.team || player.team != me.team};
        let canHit = function(player) {return null == world[canSee](me, player.x3, player.y3 - player.crouchVal * crouchDst, player.z3)};
        let normaliseYaw = function(yaw) {return (yaw % Math.PI2 + Math.PI2) % Math.PI2;};
        let getDir = function(a, b, c, d) {
            return Math.atan2(b - d, a - c);
        };
        let getD3D = function(a, b, c, d, e, f) {
            let g = a - d, h = b - e, i = c - f;
            return Math.sqrt(g * g + h * h + i * i);
        };
        let getXDire = function(a, b, c, d, e, f) {
            let g = Math.abs(b - e), h = getD3D(a, b, c, d, e, f);
            return Math.asin(g / h) * (b > e ? -1 : 1);
        };

        let dAngleTo = function(x, y, z) {
            let ty = normaliseYaw(getDir(controls.object.position.z, controls.object.position.x, z, x));
            let tx = getXDire(controls.object.position.x, controls.object.position.y, controls.object.position.z, x, y, z);
            let oy = normaliseYaw(controls.object.rotation.y);
            let ox = controls[pchObjc].rotation.x;
            let dYaw = Math.min(Math.abs(ty - oy), Math.abs(ty - oy - Math.PI2), Math.abs(ty - oy + Math.PI2));
            let dPitch = tx - ox;
            return Math.hypot(dYaw, dPitch);
        };
        let calcAngleTo = function(player) {return dAngleTo(player.x3, player.y3 + playerHeight - (headScale + hitBoxPad) / 2 - player.crouchVal * crouchDst, player.z3);};
        let calcDistanceTo = function(player) {return getD3D(player.x3, player.y3, player.z3, me.x, me.y, me.z)};
        let isCloseEnough = function(player) {let distance = calcDistanceTo(player); return me.weapon.range >= distance && ("Shotgun" != me.weapon.name || distance < 70) && ("Akimbo Uzi" != me.weapon.name || distance < 100);};
        let haveAmmo = function() {return !(me.ammos[me.weaponIndex] !== undefined && me.ammos[me.weaponIndex] == 0);};

        // target selector - based on closest to aim
        let closest = null, closestAngle = Infinity;
        let players = world.players.list;
        for (var i = 0; me.active && i < players.length; i++) {
            let e = players[i];
            if (e[isYou] || !e.active || !e[objInstances] || !isEnemy(e)) {
                continue;
            }

            // experimental prediction removed
            e.x3 = e.x;
            e.y3 = e.y;
            e.z3 = e.z;

            if (!isCloseEnough(e) || !canHit(e)) {
                continue;
            }

            let angle = calcAngleTo(e);
            if (angle < closestAngle) {
                closestAngle = angle;
                closest = e;
            }
        }
        // aimbot
        let ty = controls.object.rotation.y, tx = controls[pchObjc].rotation.x;
        if (closest) {
            let target = closest;
            let y = target.y3 + playerHeight - (headScale/* + hitBoxPad*/) / 2 - target.crouchVal * crouchDst;
            if (me.weapon.nAuto && me.didShoot) {
                inputs[SHOOT] = 0;
            } else if (!me.aimVal) {
                inputs[SHOOT] = 1;
                inputs[SCOPE] = 1;
            } else {
                inputs[SCOPE] = 1;
            }

            ty = getDir(controls.object.position.z, controls.object.position.x, target.z3, target.x3);
            tx = getXDire(controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x3, y, target.z3);

            // perfect recoil control
            tx -= .3 * me[recoilAnimY];
        } else {
            inputs[SHOOT] = controls[mouseDownL];
            inputs[SCOPE] = controls[mouseDownR];
        }

        // silent aim
        inputs[xDr] = (tx % Math.PI2).round(3);
        inputs[yDr] = (ty % Math.PI2).round(3);

        // auto reload
        controls.keys[controls.reloadKey] = !haveAmmo() * 1;

        // bhop
        inputs[JUMP] = (controls.keys[controls.jumpKey] && !me.didJump) * 1;

        // runs once to set up renders
        if (!window[keyMap['init']]) {
            window[keyMap['init']] = true;

            drawVisuals = function(c) {
                let scalingFactor = arguments.callee.caller.caller.arguments[0];
                let perspective = arguments.callee.caller.caller.arguments[2];
                let scaledWidth = c.canvas.width / scalingFactor;
                let scaledHeight = c.canvas.height / scalingFactor;
                let worldPosition = perspective.camera.getWorldPosition();
                for (var i = 0; i < world.players.list.length; i++) {
                    let player = world.players.list[i];
                    let e = players[i];
                    if (e[isYou] || !e.active || !e[objInstances] || !isEnemy(e)) {
                        continue;
                    }

                    // the below variables correspond to the 2d box esps corners
                    // note: we can already tell what ymin ymax is
                    let xmin = Infinity;
                    let xmax = -Infinity;
                    let ymin = Infinity;
                    let ymax = -Infinity;
                    let br = false;
                    for (var j = -1; !br && j < 2; j+=2) {
                        for (var k = -1; !br && k < 2; k+=2) {
                            for (var l = 0; !br && l < 2; l++) {
                                let position = e[objInstances].position.clone();
                                position.x += j * playerScale;
                                position.z += k * playerScale;
                                position.y += l * (playerHeight - e.crouchVal * crouchDst);
                                if (!perspective.frustum.containsPoint(position)) {
                                    br = true;
                                    break;
                                }
                                position.project(perspective.camera);
                                xmin = Math.min(xmin, position.x);
                                xmax = Math.max(xmax, position.x);
                                ymin = Math.min(ymin, position.y);
                                ymax = Math.max(ymax, position.y);
                            }
                        }
                    }

                    if (br) {
                        continue;
                    }

                    xmin = (xmin + 1) / 2;
                    ymin = (ymin + 1) / 2;
                    xmax = (xmax + 1) / 2;
                    ymax = (ymax + 1) / 2;


                    c.save();
                    // save and restore these variables later so they got nothing on us
                    const original_strokeStyle = c.strokeStyle;
                    const original_lineWidth = c.lineWidth;
                    const original_font = c.font;
                    const original_fillStyle = c.fillStyle;

                    // perfect box esp
                    c.lineWidth = 5;
                    c.strokeStyle = 'rgba(255,50,50,1)';

                    let distanceScale = Math.max(.3, 1 - getD3D(worldPosition.x, worldPosition.y, worldPosition.z, e.x, e.y, e.z) / 600);
                    c.scale(distanceScale, distanceScale);
                    let xScale = scaledWidth / distanceScale;
                    let yScale = scaledHeight / distanceScale;

                    c.beginPath();
                    ymin = yScale * (1 - ymin);
                    ymax = yScale * (1 - ymax);
                    xmin = xScale * xmin;
                    xmax = xScale * xmax;
                    c.moveTo(xmin, ymin);
                    c.lineTo(xmin, ymax);
                    c.lineTo(xmax, ymax);
                    c.lineTo(xmax, ymin);
                    c.lineTo(xmin, ymin);
                    c.stroke();

                    // health bar
                    c.fillStyle = "rgba(255,50,50,1)";
                    let barMaxHeight = ymax - ymin;
                    c.fillRect(xmin - 7, ymin, -10, barMaxHeight);
                    c.fillStyle = "#00FFFF";
                    c.fillRect(xmin - 7, ymin, -10, barMaxHeight * (e.health / e.maxHealth));

                    // info
                    c.font = "60px Sans-serif";
                    c.fillStyle = "white";
                    c.strokeStyle='black';
                    c.lineWidth = 1;
                    let x = xmax + 7;
                    let y = ymax;
                    c.fillText(e.name, x, y);
                    c.strokeText(e.name, x, y);
                    c.font = "30px Sans-serif";
                    y += 35;
                    c.fillText(e.weapon.name, x, y);
                    c.strokeText(e.weapon.name, x, y);
                    y += 35;
                    c.fillText(e.health + ' HP', x, y);
                    c.strokeText(e.health + ' HP', x, y);

                    c.strokeStyle = original_strokeStyle;
                    c.lineWidth = original_lineWidth;
                    c.font = original_font;
                    c.fillStyle = original_fillStyle;
                    c.restore();

                    // skelly chams
                    // note: this can be done better
                    if (e.legMeshes[0]) {
                        let material = e.legMeshes[0].material;
                        material.alphaTest = 1;
                        material.depthTest = false;
                        material.fog = false;
                        material.emissive.r = 1;
                        material.emissive.g = 1;
                        material.emissive.b = 1;
                        material.wireframe = true;
                    }

                }
            };
        };
    };
    keyMap['hrtCheat'] = genKey();
    global_invisible_define(keyMap['hrtCheat'], hrtCheat);

    const handler = {
      construct(target, args) {
        // ttap#4547
        if (args.length == 2 && args[1].length > 1337) {
            let script = args[1];

            // anti anti chet & anti skid
            const version = script.match(/\w+\['exports'\]=(0[xX][0-9a-fA-F]+);/)[1];
            if (version !== "0x597b") {
                window[atob('ZG9jdW1lbnQ=')][atob('d3JpdGU=')](atob('VmVyc2lvbiBtaXNzbWF0Y2gg') + version);
                window[atob('bG9jYX'+'Rpb24'+'=')][atob('aHJ'+'lZg='+'=')] = atob('aHR0cHM6'+'Ly9naXRodWIuY2'+'9tL2hydC93aGVlb'+'GNoYWly');
            }

            var canSee = "'"+script.match(/,this\['(\w+)'\]=function\(\w+,\w+,\w+,\w+,\w+\){if\(!\w+\)return!\w+;/)[1]+"'";
            var pchObjc = "'"+script.match(/\(\w+,\w+,\w+\),this\['(\w+)'\]=new \w+\['\w+'\]\(\)/)[1]+"'";
            var objInstances = "'"+script.match(/\[\w+\]\['\w+'\]=!\w+,this\['\w+'\]\[\w+\]\['\w+'\]&&\(this\['\w+'\]\[\w+\]\['(\w+)'\]\['\w+'\]=!\w+/)[1]+"'";
            var isYou = "'"+script.match(/,this\['\w+'\]=!\w+,this\['\w+'\]=!\w+,this\['(\w+)'\]=\w+,this\['\w+'\]\['length'\]=\w+,this\[/)[1]+"'";
            var recoilAnimY = "'"+script.match(/\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*1,this\['\w+'\]=\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,/)[1]+"'";
            var mouseDownL = "'"+script.match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[1]+"'";
            var mouseDownR = "'"+script.match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[2]+"'";

            var inputs = script.match(/\(\w+,\w*1\)\),\w+\['\w+'\]=\w*0,\w+\['\w+'\]=\w*0,!(\w+)\['\w+'\]&&\w+\['\w+'\]\['push'\]\((\w+)\),(\w+)\['\w+'\]/)[2];
            var world = script.match(/\(\w+,\w*1\)\),\w+\['\w+'\]=\w*0,\w+\['\w+'\]=\w*0,!(\w+)\['\w+'\]&&\w+\['\w+'\]\['push'\]\((\w+)\),(\w+)\['\w+'\]/)[1];
            var consts = script.match(/\w+\['\w+'\]\),\w+\['\w+'\]\(\w+\['\w+'\],\w+\['\w+'\]\+\w+\['\w+'\]\*(\w+)/)[1];
            var me = script.match(/\(\w+,\w*1\)\),\w+\['\w+'\]=\w*0,\w+\['\w+'\]=\w*0,!(\w+)\['\w+'\]&&\w+\['\w+'\]\['push'\]\((\w+)\),(\w+)\['\w+'\]/)[3];
            var math = script.match(/\\x20\-50\%\)\\x20rotate\('\+\((\w+)\['\w+'\]\(\w+\[\w+\]\['\w+'\]/)[1];


            const code_to_overwrite = script.match(/(\w+\['\w+'\]&&\(\w+\['\w+'\]=\w+\['\w+'\],!\w+\['\w+'\]&&\w+\['\w+'\]\(\w+,\w*1\)\),\w+\['\w+'\]=\w*0,\w+\['\w+'\]=\w*0),!\w+\['\w+'\]&&\w+\['\w+'\]\['push'\]\(\w+\),\w+\['\w+'\]\(\w+,\w+,!\w*1,\w+\['\w+'\]\)/)[1];
            const ttapParams = [me, inputs, world, consts, math, canSee, pchObjc, objInstances, isYou, recoilAnimY, mouseDownL, mouseDownR].toString();
            let call_hrt = `window['` + keyMap['hrtCheat'] + `'](` + ttapParams + `)`;

            /*
                pad to avoid stack trace line number detections
                the script will have the same length as it originally had
            */
            while (call_hrt.length < code_to_overwrite.length) {
                call_hrt += ' ';
            }

            const hooked_call = Function.prototype.call;
            Function.prototype.call = original_call;
            /* the bIg mod */
            script = replace.call(script, code_to_overwrite, call_hrt);

            /* Below are some misc features which I wouldn't consider bannable, third party clients could be using them */
            // all weapons trails on
            script = replace.call(script, /\w+\['weapon'\]&&\w+\['weapon'\]\['trail'\]/g, "true")

            // color blind mode
            script = replace.call(script, /#9eeb56/g, '#00FFFF');

            // no zoom
            script = replace.call(script, /,'zoom':.+?(?=,)/g, ",'zoom':1");

            // script = replace.call(script, /(void this\['sendQueue'\]\['push'\]\(\[(\w+),(\w+)\]\);)/, '$1_[$2]=$3;');
            Function.prototype.call = hooked_call;
            /***********************************************************************************************************/

            // bypass modification check of returned function
            const original_script = args[1];
            args[1] = script;
            let mod_fn = new target(...args);
            args[1] = original_script;
            let original_fn = new target(...args);
            conceal_function(original_fn, mod_fn);
            return mod_fn;
        }
        return new target(...args);
      }
    };

    // we intercept game.js at the `Function` generation level
    const original_Function = Function;
    let hook_Function = new Proxy(Function, handler);
    conceal_function(original_Function, hook_Function);
    Function = hook_Function;
})()
