"use strict";
let counter = 0;
const emptyLog = () => {
    console.log(" ");
};
const userVisualization = (parent, elementName) => {
    counter = counter + 1;
    const div = document.createElement("div");
    div.id = `${counter}`;
    const icon = document.createElement("img");
    icon.setAttribute("src", "./assets/usuario.png");
    icon.setAttribute("alt", "nature");
    icon.setAttribute("height", "50");
    icon.setAttribute("width", "50");
    icon.style.marginLeft = "20px";
    icon.style.marginRight = "20px";
    parent.appendChild(div);
    div.textContent = elementName;
    div.appendChild(icon);
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.alignItems = "center";
    div.style.padding = "10px";
    div.style.borderTop = "1px solid black";
    return div;
};
class Newsletter {
    constructor(name) {
        this.name = name;
        this.listeners = [];
        this.parentElement = document.getElementById("newsletterList");
        this.thisElement = null;
        if (this.parentElement != null)
            this.thisElement = userVisualization(this.parentElement, this.name);
    }
    notifySubscribers(news) {
        this.listeners.forEach((subscriber) => {
            subscriber.update(news);
        });
    }
    subscribe(subscriber) {
        this.listeners.push(subscriber);
        console.log(`${subscriber.name} se ha suscrito a ${this.name}`);
    }
    unsuscribe(subscriber) {
        const index = this.listeners.indexOf(subscriber);
        if (index === -1)
            return;
        this.listeners.splice(index, 1);
        console.log(`${subscriber.name} abandonó ${this.name}`);
    }
    addNews(news) {
        this.notifySubscribers(`${this.name}: ${news}`);
        console.log(`${this.name} notified its subscribers!`);
        if (this.thisElement != null) {
            this.thisElement.appendChild(document.createTextNode(`${news}\n`));
            this.thisElement.appendChild(document.createElement("br"));
            this.thisElement.appendChild(document.createElement("br"));
        }
        if (this.listeners.length === 0)
            console.log("... but no one knew");
    }
    listSubscribers() {
        const list = `${this.name}'s subs:`;
        this.listeners.forEach((subscriber) => {
            list.concat(` ${subscriber},`);
        });
        console.log(list);
    }
}
class Reader {
    constructor(name) {
        this.name = name;
        this.notifications = [];
        this.parentElement = document.getElementById("readerList");
        this.thisElement = null;
        if (this.parentElement != null)
            this.thisElement = userVisualization(this.parentElement, this.name);
    }
    addNotification(notification) {
        this.notifications.push(notification);
        if (this.thisElement != null) {
            this.thisElement.appendChild(document.createTextNode(`${notification}\n`));
            this.thisElement.appendChild(document.createElement("br"));
            this.thisElement.appendChild(document.createElement("br"));
        }
    }
    update(news) {
        this.addNotification(news);
        console.log(`¡Soy ${this.name} y he recibido algo!`);
    }
    readNotifications() {
        console.log(`${this.name} se pone a leer las noticias...`);
        if (this.notifications.length === 0) {
            console.log("Pero no hay nada que leer todavia");
            return;
        }
        console.log(this.notifications);
    }
}
class Client {
    constructor() {
        this.newsletters = [];
        this.users = [];
    }
    newUser(name) {
        const reader = new Reader(name);
        this.users.push(reader);
        return reader;
    }
    newNewsletter(name) {
        const newsletter = new Newsletter(name);
        this.newsletters.push(newsletter);
        return newsletter;
    }
}
const client = new Client();
const diarioDelMayo = client.newNewsletter("Diario del Mayo");
const diarioDelYaqui = client.newNewsletter("Diario del Yaqui");
const diarioDelHermosillense = client.newNewsletter("Diario del Hermosillense");
const fernando = client.newUser("Fernando");
diarioDelMayo.subscribe(fernando);
diarioDelHermosillense.subscribe(fernando);
const oliver = client.newUser("Oliver");
diarioDelYaqui.subscribe(oliver);
const gardel = client.newUser("Gardel");
diarioDelHermosillense.subscribe(gardel);
emptyLog();
diarioDelHermosillense.addNews("Lo que revelan los dos nuevos esqueletos hallados en las ruinas de Pompeya");
gardel.readNotifications();
emptyLog();
diarioDelMayo.addNews("“China viola nuestro espacio aéreo todos los días”: el nerviosismo en Japón por estar en primera línea en uno de los puntos de conflicto más tensos del mundo");
fernando.readNotifications();
emptyLog();
oliver.readNotifications();
diarioDelYaqui.unsuscribe(oliver);
emptyLog();
diarioDelYaqui.addNews("Cómo un revolucionario análisis de ADN logró dar con un asesino en serie 30 años después");
