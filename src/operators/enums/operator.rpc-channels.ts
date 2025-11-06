export enum OperatorRpcChannelsEnum {
  CREATE = 'create-operator',
  FIND_BY_ID = 'operator-by-id',
  FIND_ONE = 'operator-by-filter',
  FIND_ALL = 'find-operators',
  UPDATE = 'update-operator',
  DELETE = 'delete operator',
}

const prefixOpGame = 'operator-game';
export enum OperatorGameRpcChannelsEnum {
  FIND_GAMES_ASSIGNED_BY_OPERATOR = 'find-games-assigned-by-operator',
  ASSIGN_GAME = `${prefixOpGame}-assign`,
  CREATE = `${prefixOpGame}-create`,
  FIND_ALL = `${prefixOpGame}-all`,
  FIND_BY_ID = `${prefixOpGame}-by-id`,
  FIND_BY_OPERATOR = `${prefixOpGame}-find-by-operator`,
  FIND_BY_OPERATOR_GAME = `${prefixOpGame}-find-by-operator-game`,
  UPDATE_BY_OPERATOR_GAME = `${prefixOpGame}-update-by-operator-game`,
  DELETE = `${prefixOpGame}-delete`,
}

const values = Object.values(OperatorRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

const valuesOpGame = Object.values(OperatorGameRpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const operatorRpcChannels = [...values];
export const operatorGameRpcChannels = [...valuesOpGame];
