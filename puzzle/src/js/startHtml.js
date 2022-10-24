export default () => {
  document.body.innerHTML = `<div class="container-sm container">
  <div class="row">
  <h1 class="text-center">Puzzle</h1>
  </div>
  <div class="row mt-4 g-2" id="js-controls">
    <div class="col-sm">
      <button class="btn btn-primary" id="start">New game</button>
    </div>
    <div class="col-sm">
      <button class="btn btn-secondary" id="save">Save</button>
    </div>
    <div class="col-sm">
      <button class="btn btn-primary" id="result">Results</button>
    </div>
    <div class="col-sm">
      <button class="btn btn-primary" id="sound">Sound</button>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-6  d-flex align-items-center justify-content-evenly fs-3">
      <span>Moves:</span>
      <span id="moves">0</span>
    </div>
    <div class="col-6  d-flex align-items-center justify-content-evenly fs-3">
      <span>Time:</span>
      <span id="minute">00</span>
  <span>:</span>
      <span id="second">00</span>
      </div>
  </div>
  <div class="row game-container">
    <div class="game-play game-shuffle" id="game-play">
    <button class="item" data-matrix-id="1">1</button>
    <button class="item" data-matrix-id="2">2</button>
    <button class="item" data-matrix-id="3">3</button>
    <button class="item" data-matrix-id="4">4</button>
    <button class="item" data-matrix-id="5">5</button>
    <button class="item" data-matrix-id="6">6</button>
    <button class="item" data-matrix-id="7">7</button>
    <button class="item" data-matrix-id="8">8</button>
    <button class="item" data-matrix-id="9">9</button>
    <button class="item" data-matrix-id="10">10</button>
    <button class="item" data-matrix-id="11">11</button>
    <button class="item" data-matrix-id="12">12</button>
    <button class="item" data-matrix-id="13">13</button>
    <button class="item" data-matrix-id="14">14</button>
    <button class="item" data-matrix-id="15">15</button>
    <button class="item" data-matrix-id="16">16</button>
    </div>
        </div>
  <div class="row">
  <form class="col-sm fs-7 text-center" id="frame-size">
  <p>Frame size:</p>
  <input type="radio" id="3on3"
    name="frame-size" value="3">
  <label for="3on3">3&times;3</label>
  <input type="radio" id="4on4"
  name="frame-size" value="4" checked>
  <label for="4on4">4&times;4</label>
  <input type="radio" id="5on5"
  name="frame-size" value="5">
  <label for="5on5">5&times;5</label>
  <input type="radio" id="6on6"
  name="frame-size" value="6">
  <label for="6on6">6&times;6</label>
  <input type="radio" id="7on7"
  name="frame-size" value="7">
  <label for="7on7">7&times;7</label>
  <input type="radio" id="8on8"
  name="frame-size" value="8">
  <label for="8on8">8&times;8</label>
  </form>
  </div>
  <div id="modal" class="hidden">
  you win
  </div>
  </div>`;
};
