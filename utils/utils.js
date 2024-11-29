export function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return [hour, minute, second]
    .map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    })
    .join(':')
}

export function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
export const dateUtils = {
  UNITS: {
    年: 31557600000,
    月: 2629800000,
    天: 86400000,
    小时: 3600000,
    分钟: 60000,
    秒: 1000
  },
  humanize: function (milliseconds) {
    var humanize = ''
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前'
        break
      }
    }
    return humanize || '刚刚'
  },
  format: function (dateStr) {
    var date = this.parse(dateStr)
    var diff = Date.now() - date.getTime()
    if (diff < this.UNITS['天']) {
      return this.humanize(diff)
    }
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    return (
      date.getFullYear() +
      '/' +
      _format(date.getMonth() + 1) +
      '/' +
      _format(date.getDate()) +
      '-' +
      _format(date.getHours()) +
      ':' +
      _format(date.getMinutes())
    )
  },
  formatDate: function (date) {
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate())
  },
  parse: function (str) {
    //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/)
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
  },

  today: function () {
    var date = new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate())
  },
  todayForDate: function () {
    return new Date().getDate()
  },
  isLast3Days: function () {
    var date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let day = this.lastDay(year, month)
    return day - date.getDate() <= 2
  },
  monthStartByDate: function (date) {
    var d = new Date(date)
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = d.getMonth() + 1
    let year = d.getFullYear()
    let day = 1

    return year + '-' + _format(month) + '-' + _format(day)
  },
  monthEndByDate: function () {
    var date = new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let day = this.lastDay(year, month)

    return year + '-' + _format(month) + '-' + _format(day)
  },
  monthStart: function () {
    var date = new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let day = 1

    return year + '-' + _format(month) + '-' + _format(day)
  },
  monthEndForDate: function () {
    var date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    let day = this.lastDay(year, month + 1)
    return new Date(year, month, day)
  },
  monthEnd: function () {
    var date = new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let day = this.lastDay(year, month)

    return year + '-' + _format(month) + '-' + _format(day)
  },
  nextMonthStart: function (d) {
    var date = d ? new Date(d): new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth() + 2
    let crossYear = false
    if (month <= 12) {
      this.month = month
    } else {
      crossYear = true
      month = month - 12
    }
    // month = month > 12 ? 1 : month;
    let year = date.getFullYear()
    year = crossYear ? year + 1 : year
    return year + '-' + _format(month) + '-' + _format(1)
  },
  nextMonthStartForDate: function (d) {
    var date = d ? new Date(d) : new Date()
    let month = date.getMonth() + 2
    let crossYear = false
    if (month <= 12) {
      this.month = month
    } else {
      crossYear = true
      month = month - 12
    }

    // month = month > 12 ? 1 : month;
    let year = date.getFullYear()
    year = crossYear ? year + 1 : year
    return new Date(year, month - 1, 1)
  },
  nextMonthEnd: function (d) {
    var date = d ? new Date(d) : new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth() + 2
    let crossYear = false
    if (month <= 12) {
      this.month = month
    } else {
      crossYear = true
      month = month - 12
    }
    // month = month > 12 ? 1 : month;
    let year = date.getFullYear()
    year = crossYear ? year + 1 : year
    let day = this.lastDay(year, month)
    return year + '-' + _format(month) + '-' + _format(day)
  },
  nextMonthEndForDate: function (d) {
    var date = d ? new Date(d) : new Date()
    let month = date.getMonth() + 2
    let crossYear = false
    if (month <= 12) {
      this.month = month
    } else {
      crossYear = true
      month = month - 12
    }
    // month = month > 12 ? 1 : month;
    let year = date.getFullYear()
    year = crossYear ? year + 1 : year
    let day = this.lastDay(year, month)
    return new Date(year, month - 1, day)
  },
  towMonthsLaterEnd: function (d) {
    var date = d ? new Date(d) : new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth() + 3
    let crossYear = false
    if (month <= 12) {
      this.month = month
    } else {
      crossYear = true
      month = month - 12
    }
    // month = month > 12 ? 1 : month;
    let year = date.getFullYear()
    year = crossYear ? year + 1 : year
    let day = this.lastDay(year, month)
    return year + '-' + _format(month) + '-' + _format(day)
  },
  preMonthStart: function (d) {
    var date = d ? new Date(d): new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth()
    let isCurrentMonth = false
    if (
		(new Date().getMonth() + 1 === date.getMonth() && new Date().getFullYear() === date.getFullYear()) ||
		  (new Date().getMonth === 11 && date.getFullYear() - new Date().getFullYear() === 1)
	) {
      isCurrentMonth = true
    }
    let crossYear = false
    if (month <= 0) {
      crossYear = true
      month = month + 12
    } else {
      this.month = month
    }
    let year = date.getFullYear()
    year = crossYear ? year - 1 : year
	return isCurrentMonth ? this.today() : year + '-' + _format(month) + '-' + _format(1)
  },
  preMonthStartForDate: function (d) {
    var date = d ? new Date(d) : new Date()
    let month = date.getMonth()
    // let isCurrentMonth = false
    // if (
    //   (new Date().getMonth() + 1 === date.getMonth() && new Date().getFullYear() === date.getFullYear()) ||
    //   (new Date().getMonth === 11 && date.getFullYear() - new Date().getFullYear() === 1)
    // ) {
    //   isCurrentMonth = true
    // }
    let crossYear = false
    if (month <= 0) {
      crossYear = true
      month = month + 12
    } else {
      this.month = month
    }
    let year = date.getFullYear()
    year = crossYear ? year - 1 : year
    return new Date(year, month - 1,  1)
  },
  preMonthEnd: function (d) {
    var date = d ? new Date(d) : new Date()
    var _format = function (number) {
      return number < 10 ? '0' + number : number
    }
    let month = date.getMonth()
    let crossYear = false
    if (month <= 0) {
      crossYear = true
      month = month + 12
    } else {
      this.month = month
    }
    let year = date.getFullYear()
    year = crossYear ? year - 1 : year
    let day = this.lastDay(year, month)
    return year + '-' + _format(month) + '-' + _format(day)
  },
  preMonthEndForDate: function (d) {
    var date = d ? new Date(d) : new Date()
    let month = date.getMonth()
    let crossYear = false
    if (month <= 0) {
      crossYear = true
      month = month + 12
    } else {
      this.month = month
    }
    let year = date.getFullYear()
    year = crossYear ? year - 1 : year
    let day = this.lastDay(year, month)
    return new Date(year, month - 1, day)
  },
  countCurrentMonthWorkDay: function (minDate, maxDate) {
    let firstDay = minDate.getDate()
    let lastDay = maxDate.getDate()
    let year = minDate.getFullYear()
    let month = minDate.getMonth()
    let workDays = 0
    for (let i = firstDay; i <= lastDay; i++) {
      let date = new Date(year, month, i)
      if (date.getDay() !== 6 && date.getDay() !== 0) {
        workDays++
      }
    }
    return workDays
  },
  lastDay: function (year, month) {
    let day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
    if (month === 2) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          day = 29
        }
      } else if (year % 4 === 0) {
        day = 29
      }
    }
    return day
  }
}

// export formatLocation
// export formatLocation
// export dateUtils
// module.exports = {
//   formatTime: formatTime,
//   formatLocation: formatLocation,
//   dateUtils: dateUtils
// }
