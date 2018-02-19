function validate(vin) {

  if (vin.length !== 17) return false;

  return get_check_digit(vin) === vin[8];

  function get_check_digit(vin) {
    const map = '0123456789X';
    const weights = '8765432X098765432';
    let sum = 0;

    for (let i = 0; i < 17; ++i)
      sum += transliterate(vin[i]) * map.indexOf(weights[i]);
    return map[sum % 11];
  }

  function transliterate(c) {
    return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
  }

}
