import type { CodeBuilderOptions } from '../helpers/code-builder.js';
import type { Request } from '../index.js';
import type { Merge } from 'type-fest';

import { c } from './c/target.js';
import { clojure } from './clojure/target.js';
import { csharp } from './csharp/target.js';
import { go } from './go/target.js';
import { http } from './http/target.js';
import { java } from './java/target.js';
import { javascript } from './javascript/target.js';
import { json } from './json/target.js';
import { kotlin } from './kotlin/target.js';
import { node } from './node/target.js';
import { objc } from './objc/target.js';
import { ocaml } from './ocaml/target.js';
import { php } from './php/target.js';
import { powershell } from './powershell/target.js';
import { python } from './python/target.js';
import { r } from './r/target.js';
import { ruby } from './ruby/target.js';
import { shell } from './shell/target.js';
import { swift } from './swift/target.js';

export type TargetId = keyof typeof targets;

export type ClientId = string;

export interface ClientInfo<T extends Record<string, any> = Record<string, any>> {
  /**
   * A description of the client.
   *
   * @example Promise based HTTP client for the browser and node.js
   */
  description: string;

  /**
   * The default file extension for the client.
   *
   * @example `.js`
   */
  extname: Extension;
  /**
   * Retrieve or generate a command to install the client.
   *
   * @example () => 'npm install axios --save';
   */
  installation?: Converter<T>;

  /**
   * A unique identifier for the client.
   *
   * This should be a string that is unique to the client for the given target.
   *
   * @example `axios`
   */
  key: ClientId;

  /**
   * A link to the documentation or homepage of the client.
   *
   * @example https://github.com/axios/axios
   */
  link: string;

  /**
   * The formatted name of the client.
   *
   * @example Axios
   */
  title: string;
}

export type Converter<T extends Record<string, any>> = (
  request: Request,
  options?: Merge<CodeBuilderOptions, T>,
) => string;

export interface Client<T extends Record<string, any> = Record<string, any>> {
  convert: Converter<T>;
  info: ClientInfo<T>;
}

export interface ClientPlugin<T extends Record<string, any> = Record<string, any>> {
  client: Client<T>;
  target: TargetId;
}

export type Extension = `.${string}` | null;

export interface TargetInfo {
  cli?: string;
  default: string;
  key: TargetId;
  title: string;
}

export interface Target {
  clientsById: Record<ClientId, Client>;
  info: TargetInfo;
}

type supportedTargets =
  | 'c'
  | 'clojure'
  | 'csharp'
  | 'go'
  | 'http'
  | 'java'
  | 'javascript'
  | 'json'
  | 'kotlin'
  | 'node'
  | 'objc'
  | 'ocaml'
  | 'php'
  | 'powershell'
  | 'python'
  | 'r'
  | 'ruby'
  | 'shell'
  | 'swift';

export const targets: Record<supportedTargets, Target> = {
  c,
  clojure,
  csharp,
  go,
  http,
  java,
  javascript,
  json,
  kotlin,
  node,
  objc,
  ocaml,
  php,
  powershell,
  python,
  r,
  ruby,
  shell,
  swift,
};

export const isTarget = (target: Target): target is Target => {
  if (typeof target !== 'object' || target === null || Array.isArray(target)) {
    const got = target === null ? 'null' : Array.isArray(target) ? 'array' : typeof target;
    throw new Error(`you tried to add a target which is not an object, got type: "${got}"`);
  }

  if (!Object.prototype.hasOwnProperty.call(target, 'info')) {
    throw new Error('targets must contain an `info` object');
  }

  if (!Object.prototype.hasOwnProperty.call(target.info, 'key')) {
    throw new Error('targets must have an `info` object with the property `key`');
  }

  if (!target.info.key) {
    throw new Error('target key must be a unique string');
  }

  if (Object.prototype.hasOwnProperty.call(targets, target.info.key)) {
    throw new Error(`a target already exists with this key, \`${target.info.key}\``);
  }

  if (!Object.prototype.hasOwnProperty.call(target.info, 'title')) {
    throw new Error('targets must have an `info` object with the property `title`');
  }

  if (!target.info.title) {
    throw new Error('target title must be a non-zero-length string');
  }

  if (
    !Object.prototype.hasOwnProperty.call(target, 'clientsById') ||
    !target.clientsById ||
    Object.keys(target.clientsById).length === 0
  ) {
    throw new Error(
      `No clients provided in target ${target.info.key}.  You must provide the property \`clientsById\` containg your clients.`,
    );
  }

  if (!Object.prototype.hasOwnProperty.call(target.info, 'default')) {
    throw new Error('targets must have an `info` object with the property `default`');
  }

  if (!Object.prototype.hasOwnProperty.call(target.clientsById, target.info.default)) {
    throw new Error(
      `target ${target.info.key} is configured with a default client ${
        target.info.default
      }, but no such client was found in the property \`clientsById\` (found ${JSON.stringify(
        Object.keys(target.clientsById),
      )})`,
    );
  }

  Object.values(target.clientsById).forEach(isClient);

  return true;
};

export const addTarget = (target: Target): void => {
  if (!isTarget(target)) {
    return;
  }
  targets[target.info.key] = target;
};

export const isClient = (client: Client): client is Client => {
  if (!client) {
    throw new Error('clients must be objects');
  }

  if (!Object.prototype.hasOwnProperty.call(client, 'info')) {
    throw new Error('targets client must contain an `info` object');
  }

  if (!Object.prototype.hasOwnProperty.call(client.info, 'key')) {
    throw new Error('targets client must have an `info` object with property `key`');
  }

  if (!client.info.key) {
    throw new Error('client.info.key must contain an identifier unique to this target');
  }

  if (!Object.prototype.hasOwnProperty.call(client.info, 'title')) {
    throw new Error('targets client must have an `info` object with property `title`');
  }

  if (!Object.prototype.hasOwnProperty.call(client.info, 'description')) {
    throw new Error('targets client must have an `info` object with property `description`');
  }

  if (!Object.prototype.hasOwnProperty.call(client.info, 'link')) {
    throw new Error('targets client must have an `info` object with property `link`');
  }

  if (!Object.prototype.hasOwnProperty.call(client.info, 'extname')) {
    throw new Error('targets client must have an `info` object with the property `extname`');
  }

  if (!Object.prototype.hasOwnProperty.call(client, 'convert') || typeof client.convert !== 'function') {
    throw new Error('targets client must have a `convert` property containing a conversion function');
  }

  return true;
};

export const addClientPlugin = (plugin: ClientPlugin): void => {
  addTargetClient(plugin.target, plugin.client);
};

export const addTargetClient = (targetId: TargetId, client: Client): void => {
  if (!isClient(client)) {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(targets, targetId)) {
    throw new Error(`Sorry, but no ${targetId} target exists to add clients to`);
  }

  if (Object.prototype.hasOwnProperty.call(targets[targetId], client.info.key)) {
    throw new Error(
      `the target ${targetId} already has a client with the key ${client.info.key}, please use a different key`,
    );
  }

  targets[targetId].clientsById[client.info.key] = client;
};
