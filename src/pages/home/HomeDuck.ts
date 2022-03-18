import { reduceFromPayload, createToPayload, DuckMap } from 'saga-duck';
import { takeLatest } from '@/utils/redux-saga-catch';

enum Types {
  'SET_HOME_TITLE',
}

export default class HomeDuck extends DuckMap {
  get quickTypes() {
    return {
      ...Types,
    };
  }

  // reducers数据
  get reducers() {
    const { types } = this;
    return {
      title: reduceFromPayload<string>(types.SET_HOME_TITLE, '默认首页'),
    };
  }
  // 修改reducers数据的action
  get creators() {
    const { types } = this;
    return {
      setTitle: createToPayload<string>(types.SET_HOME_TITLE),
    };
  }
  // 计算属性
  get rawSelectors() {
    type State = this['State'];
    return {
      message: (state: State) => {
        return `输入的是${state.title}`;
      },
    };
  }
  // 监听
  *addEventListener() {
    yield takeLatest(
      this.types.SET_HOME_TITLE,
      function ({ payload }: { payload: any }) {
        console.log('监听到title的修改', payload);
      }
    );
  }

  public *saga() {
    yield* super.saga();
    yield* this.addEventListener();
  }
}
