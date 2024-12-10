import { Applet, AppletAction } from '@web-applets/sdk';

type Subscriber = (data: any) => void;

export interface StorageData {
  appletUrl: string;
  applet?: Applet;
}

let data: StorageData = {
  appletUrl: '',
};

if (localStorage.getItem('data')) {
  data = JSON.parse(localStorage.getItem('data'));
}

const subscribers = new Set<Subscriber>();

function update(newData: object) {
  data = { ...data, ...newData };
  localStorage.setItem(
    'data',
    JSON.stringify({
      appletUrl: data.appletUrl,
    })
  );
  subscribers.forEach((callback) => callback(data));
}

function get() {
  return data;
}

function subscribe(callback: Subscriber) {
  callback(data);
  subscribers.add(callback);
  return () => unsubscribe(callback);
}

function unsubscribe(callback: Subscriber) {
  subscribers.delete(callback);
}

export const store = {
  get,
  update,
  subscribe,
  unsubscribe,
};