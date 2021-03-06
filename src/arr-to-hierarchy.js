(function () {
    function getHierachyDatas(raw, hierachyDatas, curHierarchy, hierarchyCfg, keyMap) {
        var data;
        if (curHierarchy === hierarchyCfg.length) {
            data = {};
            for (var key in keyMap) {

                if (hierarchyCfg.every(function (cfg) { return key !== cfg.key; })) {
                    data[key] = raw[keyMap[key]];
                }
            }
            hierachyDatas.push(data);
        } else {

            if (!hierachyDatas.some(function (data) {
                if (data[hierarchyCfg[curHierarchy].key] ===
                    raw[keyMap[hierarchyCfg[curHierarchy].key]]) {

                    getHierachyDatas(
                        raw,
                        data[hierarchyCfg[curHierarchy].next],
                        curHierarchy + 1,
                        hierarchyCfg,
                        keyMap
                    );

                    return true;
                }
            })) {
                // console.log(keyMap);
                data = {};
                data[hierarchyCfg[curHierarchy].key] = raw[keyMap[hierarchyCfg[curHierarchy].key]];
                data[hierarchyCfg[curHierarchy].next] = [];

                hierachyDatas.push(data);
                getHierachyDatas(
                    raw,
                    data[hierarchyCfg[curHierarchy].next],
                    curHierarchy + 1,
                    hierarchyCfg,
                    keyMap
                );
            }
        }
        return hierachyDatas;
    }

    function parse(raws, hierarchyCfg, keyMap) {
        var hierachyDatas = [];
        raws.forEach(function (raw) {
            getHierachyDatas(raw, hierachyDatas, 0, hierarchyCfg, keyMap);
        });
        return hierachyDatas;
    }

    var moduleName = parse;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = moduleName;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () { return moduleName; });
    } else {
        this.moduleName = moduleName;
    }
}).call(function () {
    return this || (typeof window !== 'undefined' ? window : global);
});