function permutations(arr, len) {

    if (!(arr instanceof Array)) {
        throw new TypeError("input data must be an Array");
    }

    var list = [],
        arr = arr.slice();

    function permute(arr, len, startPosition, result){
        if (len == 0){
          list.push(result.slice());
          return;
      }       
      for (var i = startPosition; i <= arr.length-len; i++){
          result[result.length - len] = arr[i];
          permute(arr, len-1, i+1, result);
      }
    }          

    var r = new Array(len);
    permute(arr, len, 0, r);

    return list;
}