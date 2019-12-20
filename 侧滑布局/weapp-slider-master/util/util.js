

/**
 * 分享配置
 * @param  {String} title  [Title]
 * @param  {String} path   [Path]
 * @return {Object}        [Share Config]
 */
const shareConfig = (option = {}) => {
  let title = '程序员-编程（面试）专用'
  let path = '/pages/index/index'

  if (option.title && option.title != '') title = option.title

  if (option.path && option.path != '') path = option.path

  return {
    title: title,
    path: path
  }
}



/**
* 格式化时间 
* @param {String} date 原始时间格式
* 格式后的时间：yyyy/mm/dd hh:mm:ss
**/
const formatTime = (date) => {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
* 从一个数组中随机取出若干个元素组成数组
* @param {Array} arr 原数组
* @param {Number} count 需要随机取得个数
**/
const getRandomArray = (arr, count) => {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

/**
* 从一个数组中随机取出一个元素
* @param {Array} arr 原数组
**/
const getRandomArrayElement = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
}



module.exports = {
  shareConfig: shareConfig,
  formatTime: formatTime,
  getRandomArray: getRandomArray,
  getRandomArrayElement: getRandomArrayElement,
}