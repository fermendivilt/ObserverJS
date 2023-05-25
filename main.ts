let counter = 0;
const emptyLog = (): void => {
  console.log(" ");
};

const userVisualization = (
  parent: HTMLElement,
  elementName: string
): HTMLElement => {
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

interface Subscriber {
  name: string;
  addNotification(notification: string): void;
  update(news: string): void;
}

class Newsletter {
  private parentElement: HTMLElement | null;
  private thisElement: HTMLElement | null;
  private name: string;
  private listeners: Array<Subscriber>;

  constructor(name: string) {
    this.name = name;
    this.listeners = [];
    this.parentElement = document.getElementById("newsletterList");
    this.thisElement = null; 

    if (this.parentElement != null)
      this.thisElement = userVisualization(this.parentElement, this.name);
  }

  private notifySubscribers(news: string): void {
    this.listeners.forEach((subscriber) => {
      subscriber.update(news);
    });
  }

  public subscribe(subscriber: Subscriber): void {
    this.listeners.push(subscriber);
    console.log(`${subscriber.name} se ha suscrito a ${this.name}`);
  }

  public unsuscribe(subscriber: Subscriber): void {
    const index = this.listeners.indexOf(subscriber);

    if (index === -1) return;

    this.listeners.splice(index, 1);

    console.log(`${subscriber.name} abandonó ${this.name}`);
  }

  public addNews(news: string): void {
    this.notifySubscribers(`${this.name}: ${news}`);

    console.log(`${this.name} notified its subscribers!`);

    if (this.thisElement != null) {
      this.thisElement.appendChild(
        document.createTextNode(`${news}\n`)
      );
      this.thisElement.appendChild(document.createElement("br"));
      this.thisElement.appendChild(document.createElement("br"));
    }

    if (this.listeners.length === 0) console.log("... but no one knew");
  }

  public listSubscribers(): void {
    const list = `${this.name}'s subs:`;

    this.listeners.forEach((subscriber) => {
      list.concat(` ${subscriber},`);
    });

    console.log(list);
  }
}

class Reader implements Subscriber {
  private parentElement: HTMLElement | null;
  private thisElement: HTMLElement | null;
  private notifications: Array<string>;
  name: string;


  constructor(name: string) {
    this.name = name;
    this.notifications = [];
    this.parentElement = document.getElementById("readerList");
    this.thisElement = null;

    if (this.parentElement != null)
      this.thisElement = userVisualization(this.parentElement, this.name);
  }

  addNotification(notification: string): void {
    this.notifications.push(notification);

    if (this.thisElement != null) {
      this.thisElement.appendChild(
        document.createTextNode(`${notification}\n`)
      );
      this.thisElement.appendChild(document.createElement("br"));
      this.thisElement.appendChild(document.createElement("br"));
    }
  }

  public update(news: string): void {
    this.addNotification(news);
    console.log(`¡Soy ${this.name} y he recibido algo!`);
  }

  readNotifications(): void {
    console.log(`${this.name} se pone a leer las noticias...`);

    if (this.notifications.length === 0) {
      console.log("Pero no hay nada que leer todavia");
      return;
    }
    console.log(this.notifications);
  }
}

class Client {
  private newsletters: Array<Newsletter>;
  private users: Array<Reader>;

  constructor() {
    this.newsletters = [];
    this.users = [];
  }

  public newUser(name: string): Reader {
    const reader = new Reader(name);
    this.users.push(reader);

    return reader;
  }
  public newNewsletter(name: string): Newsletter {
    const newsletter = new Newsletter(name);
    this.newsletters.push(newsletter);

    return newsletter;
  }
}

const client: Client = new Client();

const diarioDelMayo: Newsletter = client.newNewsletter("Diario del Mayo");
const diarioDelYaqui: Newsletter = client.newNewsletter("Diario del Yaqui");
const diarioDelHermosillense: Newsletter = client.newNewsletter(
  "Diario del Hermosillense"
);

const fernando: Reader = client.newUser("Fernando");
diarioDelMayo.subscribe(fernando);
diarioDelHermosillense.subscribe(fernando);

const oliver: Reader = client.newUser("Oliver");
diarioDelYaqui.subscribe(oliver);

const gardel: Reader = client.newUser("Gardel");
diarioDelHermosillense.subscribe(gardel);

emptyLog();

diarioDelHermosillense.addNews(
  "Lo que revelan los dos nuevos esqueletos hallados en las ruinas de Pompeya"
);
gardel.readNotifications();

emptyLog();

diarioDelMayo.addNews(
  "“China viola nuestro espacio aéreo todos los días”: el nerviosismo en Japón por estar en primera línea en uno de los puntos de conflicto más tensos del mundo"
);
fernando.readNotifications();

emptyLog();

oliver.readNotifications();
diarioDelYaqui.unsuscribe(oliver);

emptyLog();

diarioDelYaqui.addNews(
  "Cómo un revolucionario análisis de ADN logró dar con un asesino en serie 30 años después"
);
