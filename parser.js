const data = require('./monstats.json');
const MonLvl = require('./MonLvl.json');

const starttags = "[zform][form][b]";
const middletags = "[/b][/form][fbox]";
const endtags = "[/fbox][/zform]";

let formarr = [];
const normImmunity = "norm";
const nightImmunity = "night";
const hellImmunity = "hell";
const hell2Immunity = "hell2";

let monsterhashellimmunity = false;
let whatwashellimmunity = "";

function hpMinMax(monster, difficulty) {
    let minimalHp = 0;
    let maximumHp = 0;
    switch (difficulty) {
        case "norm":
            minimalHp = data[monster]['minHP'] * MonLvl[data[monster]['Level']]['HP'] / 100;
            maximumHp = data[monster]['maxHP'] * MonLvl[data[monster]['Level']]['HP'] / 100;
            break;
        case "night":
            minimalHp = data[monster]['MinHP(N)'] * MonLvl[data[monster]['Level']]['HP(N)'] / 100;
            maximumHp = data[monster]['MaxHP(N)'] * MonLvl[data[monster]['Level']]['HP(N)'] / 100;
            break;
        case "hell":
            minimalHp = data[monster]['MinHP(H)'] * MonLvl[data[monster]['Level']]['HP(H)'] / 100;
            maximumHp = data[monster]['MaxHP(H)'] * MonLvl[data[monster]['Level']]['HP(H)'] / 100;
            break;
    }
    return Math.trunc(minimalHp) + "-" + Math.trunc(maximumHp);
}

function attMinMax(monster, difficulty, aNum) {
    let minimalAtt = 0;
    let maximumAtt = 0;
    switch (difficulty) {
        case "norm":
            minimalAtt = data[monster][aNum + 'MinD'] * MonLvl[data[monster]['Level']]['DM'] / 100;
            maximumAtt = data[monster][aNum + 'MaxD'] * MonLvl[data[monster]['Level']]['DM'] / 100;
            break;
        case "night":
            minimalAtt = data[monster][aNum + 'MinD(N)'] * MonLvl[data[monster]['Level']]['DM(N)'] / 100;
            maximumAtt = data[monster][aNum + 'MaxD(N)'] * MonLvl[data[monster]['Level']]['DM(N)'] / 100;
            break;
        case "hell":
            minimalAtt = data[monster][aNum + 'MinD(H)'] * MonLvl[data[monster]['Level']]['DM(H)'] / 100;
            maximumAtt = data[monster][aNum + 'MaxD(H)'] * MonLvl[data[monster]['Level']]['DM(H)'] / 100;
            break;
    }
    return Math.trunc(minimalAtt) + "-" + Math.trunc(maximumAtt);
}

function calcDef(monster, difficulty) {
    let defense = 0;
    switch (difficulty) {
        case "norm":
            defense = data[monster]['AC'] * MonLvl[data[monster]['Level']]['AC'] / 100;
            break;
        case "night":
            defense = data[monster]['AC(N)'] * MonLvl[data[monster]['Level']]['AC(N)'] / 100;
            break;
        case "hell":
            defense = data[monster]['AC(H)'] * MonLvl[data[monster]['Level']]['AC(H)'] / 100;
            break;
    }
    return Math.trunc(defense);
}

function calcAR(monster, difficulty, aNum) {
    let attRating = 0;
    switch (difficulty) {
        case "norm":
            attRating = data[monster][aNum + 'TH'] * MonLvl[data[monster]['Level']]['TH'] / 100;
            break;
        case "night":
            attRating = data[monster][aNum + 'TH(N)'] * MonLvl[data[monster]['Level']]['TH(N)'] / 100;
            break;
        case "hell":
            attRating = data[monster][aNum + 'TH(H)'] * MonLvl[data[monster]['Level']]['TH(H)'] / 100;
            break;
    }
    return Math.trunc(attRating);
}

for (const monster in data) {

    let normResArr = {};
    let nightResArr = {};
    let hellResArr = {};

    if(data[monster].hasOwnProperty('BaseId')) {
        let temp = data[monster]['BaseId'].replace(/[0-9]/g, '');
        formarr.push(temp[0].toUpperCase() + temp.slice(1) + '\n')
        formarr.push(starttags + "ibasename" + middletags + temp[0].toUpperCase() + temp.slice(1) + endtags)
    } else formarr.push(starttags + "ibasename" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('NameStr')) {
        formarr.push(starttags + "imvariant_name" + middletags + data[monster]['NameStr'] + endtags)
    } else formarr.push(starttags + "imvariant_name" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('Level')) {
        formarr.push(starttags + "imlvl_norm" + middletags + data[monster]['Level'] + endtags)
    } else formarr.push(starttags + "imlvl_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('Level(N)')) {
        formarr.push(starttags + "imlvl_night" + middletags + data[monster]['Level(N)'] + endtags)
    }  else formarr.push(starttags + "imlvl_night" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('Level(H)')) {
        formarr.push(starttags + "imlvl_hel" + middletags + data[monster]['Level(H)'] + endtags)
    }  else formarr.push(starttags + "imlvl_hel" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('AI')) {
        formarr.push(starttags + "imtrclass_norm" + middletags + "REPLACEVALUE" + endtags)
    };

    if(data[monster].hasOwnProperty('AI')) {
        formarr.push(starttags + "imtrclass_night" + middletags + "REPLACEVALUE" + endtags)
    };

    if(data[monster].hasOwnProperty('AI')) {
        formarr.push(starttags + "imtrclass_hell" + middletags + "REPLACEVALUE" + endtags)
    };

    if(data[monster].hasOwnProperty('Exp')) {
        formarr.push(starttags + "imxp_norm" + middletags + data[monster]['Exp'] + endtags)
    } else formarr.push(starttags + "imxp_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('Exp(N)')) {
        formarr.push(starttags + "imxp_night" + middletags + data[monster]['Exp(N)'] + endtags)
    } else formarr.push(starttags + "imxp_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('Exp(H)')) {
        formarr.push(starttags + "imxp_hell" + middletags + data[monster]['Exp(H)'] + endtags)
    } else formarr.push(starttags + "imxp_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('maxHP') && data[monster].hasOwnProperty('minHP') && data[monster].hasOwnProperty('Level')) {
        formarr.push(starttags + "imhp_norm" + middletags + hpMinMax(monster, "norm") + endtags)
    } else formarr.push(starttags + "imhp_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('MaxHP(N)') && data[monster].hasOwnProperty('MinHP(N)') && data[monster].hasOwnProperty('Level(N)')) {
        formarr.push(starttags + "imhp_night" + middletags + hpMinMax(monster, "night") + endtags)
    } else formarr.push(starttags + "imhp_night" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('MaxHP(H)') && data[monster].hasOwnProperty('MinHP(H)') && data[monster].hasOwnProperty('Level(H)')) {
        formarr.push(starttags + "imhp_hell" + middletags + hpMinMax(monster, "hell") + endtags)
    } else formarr.push(starttags + "imhp_hell" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('AC') && data[monster].hasOwnProperty('Level')) {
        formarr.push(starttags + "imdefense_norm" + middletags + calcDef(monster, "norm") + endtags)
    } else formarr.push(starttags + "imdefense_norm" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('AC(N)') && data[monster].hasOwnProperty('Level(N)')) {
        formarr.push(starttags + "imdefense_night" + middletags + calcDef(monster, "night") + endtags)
    } else formarr.push(starttags + "imdefense_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('AC(H)') && data[monster].hasOwnProperty('Level(H)')) {
        formarr.push(starttags + "imdefense_hell" + middletags + calcDef(monster, "hell") + endtags)
    } else formarr.push(starttags + "imdefense_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ToBlock')) {
        formarr.push(starttags + "imblock_norm" + middletags + data[monster]['ToBlock'] + endtags)
    } else formarr.push(starttags + "imblock_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ToBlock(N)')) {
        formarr.push(starttags + "imblock_night" + middletags + data[monster]['ToBlock(N)'] + endtags)
    } else formarr.push(starttags + "imblock_night" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('ToBlock(H)')) {
        formarr.push(starttags + "imblock_hell" + middletags + data[monster]['ToBlock(H)'] + endtags)
    } else formarr.push(starttags + "imblock_hell" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('Drain')) {
        formarr.push(starttags + "imdrain_norm" + middletags + data[monster]['Drain'] + endtags)
    } else formarr.push(starttags + "imdrain_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('Drain(N)')) {
        formarr.push(starttags + "imdrain_night" + middletags + data[monster]['Drain(N)'] + endtags)
    } else formarr.push(starttags + "imdrain_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('Drain(H)')) {
        formarr.push(starttags + "imdrain_hell" + middletags + data[monster]['Drain'] + endtags)
    } else formarr.push(starttags + "imdrain_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('coldeffect')) {
        formarr.push(starttags + "imchill_norm" + middletags + Math.abs(data[monster]['coldeffect']) + endtags)
    } else formarr.push(starttags + "imchill_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('coldeffect(N)')) {
        formarr.push(starttags + "imchill_night" + middletags + Math.abs(data[monster]['coldeffect(N)']) + endtags)
    } else formarr.push(starttags + "imchill_night" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('coldeffect(H)')) {
        formarr.push(starttags + "imchill_hell" + middletags + Math.abs(data[monster]['coldeffect(H)']) + endtags)
    } else formarr.push(starttags + "imchill_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResDm')) {
        formarr.push(starttags + "imdmgres_norm" + middletags + data[monster]['ResDm'] + endtags)
        normResArr.imdmgres_norm = data[monster]['ResDm']
    } else formarr.push(starttags + "imdmgres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResDm(N)')) {
        formarr.push(starttags + "imdmgres_night" + middletags + data[monster]['ResDm(N)'] + endtags)
        nightResArr.imdmgres_night = data[monster]['ResDm(N)']
    } else formarr.push(starttags + "imdmgres_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResDm(H)')) {
        formarr.push(starttags + "imdmgres_hell" + middletags + data[monster]['ResDm(H)'] + endtags)
        hellResArr.imdmgres_hell = data[monster]['ResDm(H)']
    } else formarr.push(starttags + "imdmgres_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResFi')) {
        formarr.push(starttags + "imfireres_norm" + middletags + data[monster]['ResFi'] + endtags)
        normResArr.imfireres_norm = data[monster]['ResFi']
    } else formarr.push(starttags + "imfireres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResFi(N)')) {
        formarr.push(starttags + "imfireres_night" + middletags + data[monster]['ResFi(N)'] + endtags)
        nightResArr.imfireres_night = data[monster]['ResFi(N)']
    } else formarr.push(starttags + "imfireres_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResFi(H)')) {
        formarr.push(starttags + "imfireres_hell" + middletags + data[monster]['ResFi(H)'] + endtags)
        hellResArr.imfireres_hell = data[monster]['ResFi(H)']
    } else formarr.push(starttags + "imfireres_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResCo')) {
        formarr.push(starttags + "imcoldres_norm" + middletags + data[monster]['ResCo'] + endtags)
        normResArr.imcoldres_norm = data[monster]['ResCo']
    } else formarr.push(starttags + "imcoldres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResCo(N)')) {
        formarr.push(starttags + "imcoldres_norm" + middletags + data[monster]['ResCo(N)'] + endtags)
        nightResArr.imcoldres_night = data[monster]['ResCo(N)']
    } else formarr.push(starttags + "imcoldres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResCo(H)')) {
        formarr.push(starttags + "imcoldres_norm" + middletags + data[monster]['ResCo(H)'] + endtags)
        hellResArr.imcoldres_hell = data[monster]['ResCo(H)']
    } else formarr.push(starttags + "imcoldres_norm" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('ResLi')) {
        formarr.push(starttags + "imlightres_norm" + middletags + data[monster]['ResLi'] + endtags)
        normResArr.imlightres_norm = data[monster]['ResLi']
    } else formarr.push(starttags + "imlightres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResLi(N)')) {
        formarr.push(starttags + "imlightres_norm" + middletags + data[monster]['ResLi(H)'] + endtags)
        nightResArr.imlightres_night = data[monster]['ResLi(N)']
    } else formarr.push(starttags + "imlightres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResLi(H)')) {
        formarr.push(starttags + "imlightres_norm" + middletags + data[monster]['ResLi(H)'] + endtags)
        hellResArr.imlightres_hell = data[monster]['ResLi(H)']
    } else formarr.push(starttags + "imlightres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResPo')) {
        formarr.push(starttags + "impoisres_norm" + middletags + data[monster]['ResDm'] + endtags)
        normResArr.impoisres_norm = data[monster]['ResPo']
    } else formarr.push(starttags + "impoisres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResPo(N)')) {
        formarr.push(starttags + "impoisres_night" + middletags + data[monster]['ResPo(N)'] + endtags)
        nightResArr.impoisres_night = data[monster]['ResPo(N)']
    } else formarr.push(starttags + "impoisres_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResPo(H)')) {
        formarr.push(starttags + "impoisres_hell" + middletags + data[monster]['ResPo(H)'] + endtags)
        hellResArr.impoisres_hell = data[monster]['ResPo(H)']
    } else formarr.push(starttags + "impoisres_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResMa')) {
        formarr.push(starttags + "immagicres_norm" + middletags + data[monster]['ResMa'] + endtags)
        normResArr.immagicres_norm = data[monster]['ResMa']
    } else formarr.push(starttags + "immagicres_norm" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResMa(N)')) {
        formarr.push(starttags + "immagicres_night" + middletags + data[monster]['ResMa(N)'] + endtags)
        nightResArr.immagicres_night = data[monster]['ResMa(N)']
    } else  formarr.push(starttags + "immagicres_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('ResMa(H)')) {
        formarr.push(starttags + "immagicres_hell" + middletags + data[monster]['ResMa(H)'] + endtags)
        hellResArr.immagicres_hell = data[monster]['ResMa(H)']
    } else formarr.push(starttags + "immagicres_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A1MinD') && data[monster].hasOwnProperty('A1MaxD') && data[monster].hasOwnProperty('Level')) {
        formarr.push(starttags + "imattack1_norm" + middletags + attMinMax(monster, "norm", "A1") + endtags)
    } else formarr.push(starttags + "imattack1_norm" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('A1MinD(N)') && data[monster].hasOwnProperty('A1MaxD(N)') && data[monster].hasOwnProperty('Level(N)')) {
        formarr.push(starttags + "imattack1_night" + middletags + attMinMax(monster, "night", "A1") + endtags)
    } else formarr.push(starttags + "imattack1_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A1MinD(H)') && data[monster].hasOwnProperty('A1MaxD(H)') && data[monster].hasOwnProperty('Level(H)')) {
        formarr.push(starttags + "imattack1_hell" + middletags + attMinMax(monster, "hell", "A1") + endtags)
    } else formarr.push(starttags + "imattack1_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A1TH') && data[monster].hasOwnProperty('Level')) {
        formarr.push(starttags + "imrating1_norm" + middletags + calcAR(monster, "norm", "A1") + endtags)
    } else formarr.push(starttags + "imrating1_norm" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('A1TH(N)') && data[monster].hasOwnProperty('Level(N)')) {
        formarr.push(starttags + "imrating1_night" + middletags + calcAR(monster, "night", "A1") + endtags)
    } else formarr.push(starttags + "imrating1_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A1TH(H)') && data[monster].hasOwnProperty('Level(H)')) {
        formarr.push(starttags + "imrating1_hell" + middletags + calcAR(monster, "hell", "A1") + endtags)
    } else formarr.push(starttags + "imrating1_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A2MinD') && data[monster].hasOwnProperty('A2MaxD') && data[monster].hasOwnProperty('Level')) {
        formarr.push(starttags + "imattack2_norm" + middletags + attMinMax(monster, "norm", "A2") + endtags)
    } else formarr.push(starttags + "imattack2_norm" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('A2MinD(N)') && data[monster].hasOwnProperty('A2MaxD(N)') && data[monster].hasOwnProperty('Level(N)')) {
        formarr.push(starttags + "imattack2_night" + middletags + attMinMax(monster, "night", "A2") + endtags)
    } else formarr.push(starttags + "imattack2_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A2MinD(H)') && data[monster].hasOwnProperty('A2MaxD(H)') && data[monster].hasOwnProperty('Level(H)')) {
        formarr.push(starttags + "imattack2_hell" + middletags + attMinMax(monster, "hell", "A2") + endtags)
    } else formarr.push(starttags + "imattack2_hell" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A2TH') && data[monster].hasOwnProperty('Level')) {
        formarr.push(starttags + "imrating2_norm" + middletags + calcAR(monster, "norm", "A2") + endtags)
    } else formarr.push(starttags + "imrating2_norm" + middletags + "0" + endtags)
    
    if(data[monster].hasOwnProperty('A2TH(N)') && data[monster].hasOwnProperty('Level(N)')) {
        formarr.push(starttags + "imrating2_night" + middletags + calcAR(monster, "night", "A2") + endtags)
    } else formarr.push(starttags + "imrating2_night" + middletags + "0" + endtags)

    if(data[monster].hasOwnProperty('A2TH(H)') && data[monster].hasOwnProperty('Level(H)')) {
        formarr.push(starttags + "imrating2_hell" + middletags + calcAR(monster, "hell", "A2") + endtags)
    } else formarr.push(starttags + "imrating2_hell" + middletags + "0" + endtags)

    let immunityAssigner = (resArr, difficulty) => {
        if (difficulty === "hell2" && monsterhashellimmunity) {
            for (key in resArr) {
                if (resArr[key] >= 100) {
                    switch (key)
                    {
                        case "imdmgres_" + difficulty:
                            if (whatwashellimmunity !== "Physical") {
                                formarr.push(starttags + "imimm_hell2" + middletags + "Physical" + endtags);
                                return;
                            }
                        case "immagicres_" + difficulty:
                            if (whatwashellimmunity !== "Magic") {
                                formarr.push(starttags + "imimm_hell2" + middletags + "Magic" + endtags);
                                return;
                        }
                        case "imfireres_" + difficulty:
                            if (whatwashellimmunity !== "Fire") {
                                formarr.push(starttags + "imimm_hell2" + middletags + "Fire" + endtags);
                                return;
                        }
                        case "imcoldres_" + difficulty:
                            if (whatwashellimmunity !== "Cold") {
                                formarr.push(starttags + "imimm_hell2" + middletags + "Cold" + endtags);
                                return;
                        }
                        case "imlightres_" + difficulty:
                            if (whatwashellimmunity !== "Lightning") {
                                formarr.push(starttags + "imimm_hell2" + middletags + "Lightning" + endtags);
                                return;
                        }
                        case "impoisres_" + difficulty:
                            if (whatwashellimmunity !== "Poison") {
                                formarr.push(starttags + "imimm_hell2" + middletags + "Poison" + endtags);
                                return;
                        }
                        default:
                                formarr.push(starttags + "imimm_hell2" + middletags + "0" + endtags);
                                return;
                    }
                }
            };
        } else {
            for (key in resArr) {
                if (resArr[key] >= 100) {
                    switch (key)
                    {
                        case "imdmgres_" + difficulty:
                            formarr.push(starttags + "imimm_" + difficulty.replace(/[0-9]/g, '') + middletags + "Physical" + endtags);
                            difficulty === "hell" ? monsterhashellimmunity = true : monsterhashellimmunity = false;
                            difficulty === "hell" ? whatwashellimmunity = "Physical" : whatwashellimmunity = "";
                            return;
                        case "immagicres_" + difficulty:
                            formarr.push(starttags + "imimm_" + difficulty.replace(/[0-9]/g, '') + middletags + "Magic" + endtags);
                            difficulty === "hell" ? monsterhashellimmunity = true : monsterhashellimmunity = false;
                            difficulty === "hell" ? whatwashellimmunity = "Magic" : whatwashellimmunity = "";
                            return;
                        case "imfireres_" + difficulty:
                            formarr.push(starttags + "imimm_" + difficulty.replace(/[0-9]/g, '') + middletags + "Fire" + endtags);
                            difficulty === "hell" ? monsterhashellimmunity = true : monsterhashellimmunity = false;
                            difficulty === "hell" ? whatwashellimmunity = "Fire" : whatwashellimmunity = "";
                            return;
                        case "imcoldres_" + difficulty:
                            formarr.push(starttags + "imimm_" + difficulty.replace(/[0-9]/g, '')  + middletags + "Cold" + endtags);
                            difficulty === "hell" ? monsterhashellimmunity = true : monsterhashellimmunity = false;
                            difficulty === "hell" ? whatwashellimmunity = "Cold" : whatwashellimmunity = "";
                            return;
                        case "imlightres_" + difficulty:
                            formarr.push(starttags + "imimm_" + difficulty.replace(/[0-9]/g, '')  + middletags + "Lightning" + endtags);
                            difficulty === "hell" ? monsterhashellimmunity = true : monsterhashellimmunity = false;
                            difficulty === "hell" ? whatwashellimmunity = "Lightning" : whatwashellimmunity = "";
                            return;
                        case "impoisres_" + difficulty:
                            formarr.push(starttags + "imimm_" + difficulty.replace(/[0-9]/g, '')  + middletags + "Poison" + endtags);
                            difficulty === "hell" ? monsterhashellimmunity = true : monsterhashellimmunity = false;
                            difficulty === "hell" ? whatwashellimmunity = "Poison" : whatwashellimmunity = "";
                            return;
                        default:
                            return;
                    }
                } else {
                    formarr.push(starttags + "imimm_" + difficulty + middletags + "0" + endtags);
                    monsterhashellimmunity = false;
                    whatwashellimmunity = "";
                    return;
                }
            };
        }
    }

    immunityAssigner(normResArr, normImmunity);
    immunityAssigner(nightResArr, nightImmunity);
    immunityAssigner(hellResArr, hellImmunity);
    immunityAssigner(hellResArr, hell2Immunity);

    formarr.push('\n');
}

console.log(formarr.join('\n'));