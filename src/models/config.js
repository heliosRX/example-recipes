import { GenericStore, UIDMethod } from 'heliosrx'
import exampleModelDefinition from './example';
import dragitemModelDefinition from './dragitem';
import datetimeModelDefinition from './datetime';

export const example = new GenericStore(
  "/example/*",
  exampleModelDefinition
);

export const example2 = new GenericStore(
  "/example2/*",
  exampleModelDefinition,
  { uidMethod: UIDMethod.TIMESTAMP }
);

export const draglist = new GenericStore(
  "/draglist/*",
  dragitemModelDefinition,
);

export const datetime = new GenericStore(
  "/datetime/*",
  datetimeModelDefinition,
);
