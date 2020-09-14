import {mainData, Order} from "./data/mainData.js";
import {showPage} from "./showPage.js";
import {defineStateThroughTitleHeaderOrId} from "./supporting/helpFunction.js";
import {employeeData} from "./data/employeeData.js";


webix.ready(function(){
    webix.ui({
        id : "mainPage",
        rows:[
            {},
            {
                cols:[
                    {},
                    {
                        rows:[
                                {
                                    view:"label",
                                    label: "Добро пожаловать в Task Manager!",
                                    align:"center"
                                },
                                {
                                    id : "logIn",
                                    view:"form",
                                    scroll:false,
                                    width: 400,
                                    elements:[
                                        {
                                            name : "login",
                                            view:"text",
                                            label:"Login:"
                                        },
                                        {
                                            name : "password",
                                            view:"text",
                                            type:"password",
                                            label:"Password"
                                        },
                                        {
                                            margin:5,
                                            cols:[
                                                {
                                                    view:"button",
                                                    label:"Войти" ,
                                                    type:"form",
                                                    click : clickCheckLoginAndPassword
                                                },
                                            ]
                                        }
                                    ],
                                    rules:{
                                        login: webix.rules.isNotEmpty,
                                    }
                                },
                            ]
                    },
                    {}
                ]
            },
            {},
        ]
    });
});

function clickCheckLoginAndPassword(){
    if(!$$("logIn").validate()){
        webix.message({
            text:"Логин не должен быть пустым!",
            type:"error",
            expire: 2000,
        })
        return
    }

    employeeData.getByLoginAndPassword($$("logIn").getValues())
        .then(response => {
            if(response.data.idEmployee > 0){
                drawMainPage()
            } else if(!response.error){
                webix.message({
                    text:"Неверный логин или пароль.",
                    type:"error",
                    expire: 2000,
                })
            }
        })
}

function drawMainPage(){
    webix.ui({
        id : "mainPage",
        rows:[
            {
                view:"toolbar",
                css:"webix_dark",
                height : 70,
                cols:[
                    {
                        view:"label",
                        width : 200,
                        label:"<p style='margin: 0; font-size: 25px'>Task manager</p>"
                    },
                    {
                        id: mainData.headerTitleId,
                        align:"center",
                        view:"label",
                        css : "mainText",
                        label : "",
                    },
                    {
                        width : 220,
                        cols : [
                            {
                                view:"button",
                                id : mainData.projectHeaderId,
                                css : "webix_transparent",
                                type: "image",
                                image: mainData.pathToImg + mainData.ImgMenuMap.get(mainData.projectHeaderId) + mainData.png,
                                click : clickToMenu
                            },
                            {
                                view:"button",
                                css : "webix_transparent",
                                id : mainData.projectTeamHeaderId,
                                type: "image",
                                image:  mainData.pathToImg + mainData.ImgMenuMap.get(mainData.projectTeamHeaderId) + mainData.png,
                                click : clickToMenu
                            },
                            {
                                view:"button",
                                css : "webix_transparent",
                                id : mainData.employeeHeaderId,
                                type: "image",
                                image:  mainData.pathToImg + mainData.ImgMenuMap.get(mainData.employeeHeaderId) +  mainData.active + mainData.png,
                                click : clickToMenu
                            }
                        ]
                    }
                ]
            },

            {
                id : mainData.headerBlockId,
            },



            {
                id: mainData.bodyBlockId,
            }
        ]
    }, $$("mainPage"))

    let order = new Order(false, mainData.searchHeader, mainData.mainBody)
    order.dataHeader = { headerTitle : mainData.headerTitleMap.get(mainData.projectHeaderId)}
    order.dataBody = {
        state : mainData.stateProject,
        dataBase : mainData.stateProject
    }
    showPage(order)
}


let clickToMenu = function(id){
    let order = new Order(false, mainData.searchHeader, mainData.mainBody)

    order.dataHeader = {
        headerTitle : mainData.headerTitleMap.get(id)
    }

    order.dataBody = {
        state : defineStateThroughTitleHeaderOrId(id),
        dataBase : defineStateThroughTitleHeaderOrId(id)
    }

    showPage(order)
}


let popup = {
    view:"popup",
    id:"Popup",
    position:"center",
    body:{
        width: "auto",
        height: "auto",
        rows:[
            { 
                id : (mainData.headerBlockId + mainData.popupBlock),   
            },
            {
                id:  (mainData.bodyBlockId + mainData.popupBlock),
            }
        ]
    }
}

webix.ui(popup).hide();
