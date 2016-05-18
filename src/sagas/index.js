export function* helloSaga() {
  console.log('Hello Sagas!');
}

export default function* rootSaga() {
  yield [
    helloSaga(),
  ]
}
