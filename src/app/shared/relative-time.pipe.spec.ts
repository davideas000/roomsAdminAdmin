import { RaRelativeTimePipe } from './relative-time.pipe';

describe('RaRelativeTimePipe', () => {
  const pipe = new RaRelativeTimePipe('pt');
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('#transform should return a valid value', () => {
    expect(pipe.transform('2019-02-07T10:11:00')).toBeTruthy();
  })
});
