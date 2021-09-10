const testUtil = {
  // 時間計測
  time: (name, x) => {
    const startTime = Date.now(); // 開始時間
    x(); // 計測する処理
    const endTime = Date.now(); // 終了時間

    console.log(name, endTime - startTime); // 何ミリ秒かかったかを表示する
  },
};

export { testUtil };
