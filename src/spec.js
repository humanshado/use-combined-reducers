import { expect } from 'chai';
import { spy } from 'sinon';

import useCombinedReducers from './';

describe('useCombinedReducer', () => {
  it('returns a state object with defined substates', () => {
    const [state, dispatch] = useCombinedReducers({
      a: ['1', () => {}],
      b: ['2', () => {}],
    });

    expect(state).to.eql({ a: '1', b: '2' });
  });

  it('returns a dispatch function that calls all child dispatch functions', () => {
    const aCallback = spy();
    const bCallback = spy();

    const [state, dispatch] = useCombinedReducers({
      a: ['1', aCallback],
      b: ['2', bCallback],
    });

    dispatch({ type: 'SOME_ACTION' });

    expect(aCallback.calledOnce).to.eql(true);
    expect(bCallback.calledOnce).to.eql(true);
  });
});
