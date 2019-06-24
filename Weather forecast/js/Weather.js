const WeatherArr = [
  {
    temperature: {
      night: 17,
      day: 29,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    temperature: {
      night: 14,
      day: 23,
    },
    cloudiness: 'Малооблачно',
    snow: false,
    rain: false,
  },
  {
    temperature: {
      night: 14,
      day: 23,
    },
    cloudiness: 'Малооблачно',
    snow: false,
    rain: true,
  },
  {
    temperature: {
      night: 13,
      day: 20,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    temperature: {
      night: 12,
      day: 23,
    },
    cloudiness: 'Малооблачно',
    snow: false,
    rain: true,
  },
  {
    temperature: {
      night: 20,
      day: 27,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    temperature: {
      night: 18,
      day: 25,
    },
    cloudiness: 'Облачно с прояснениями',
    snow: false,
    rain: false,
  }
]
const NewWeatherArr = changeDateArr(WeatherArr)
const WeatherList = document.getElementById('weatherList')
this.todayWeatherData = true
setComponentsList([...NewWeatherArr].splice (0, 4), WeatherList)
onClickActions(NewWeatherArr, WeatherList)

function changeDateArr(weatherArr) {
  const CurrentDate = Math.floor(new Date().getTime())
  return weatherArr.map((weatherObj, index) => {
    weatherObj.date = CurrentDate+(index*86400000)
    return weatherObj
  })
}

function setComponentsList(newWeatherArr, weatherList) {
    newWeatherArr.map((weatherObj, index) => {
        const Div = document.createElement('div')
        const ComponentsObj = {
          weekDayLabel: document.createElement('p'),
          currentDateLabel: document.createElement('p'),
          cloudinessDiv: document.createElement('div'),
          temperatureDayLabel: document.createElement('p'),
          temperatureNightLabel: document.createElement('p'),
          rainfallLabel: document.createElement('p')
        }
        const { cloudiness, snow, rain } = weatherObj
        setDataComponents(weatherObj, ComponentsObj)
        setAttributsComponents(ComponentsObj, Div, cloudiness, snow, rain)
        Object.values(ComponentsObj).forEach(component => Div.appendChild(component))
        weatherList.appendChild(Div)
    })

    function setDataComponents(weatherObj, componentsObj) {
      const {
        date,
        cloudiness,
        snow,
        rain,
        temperature
      } = weatherObj
      const {
        weekDayLabel,
        currentDateLabel,
        cloudinessDiv,
        temperatureDayLabel,
        temperatureNightLabel,
        rainfallLabel
      } = componentsObj
      const {
        night,
        day
      } = temperature
      weekDayLabel.innerHTML = convertDate(date, true)
      currentDateLabel.innerHTML = convertDate(date, false)
      temperatureDayLabel.innerHTML = `днем + ${day}°`
      temperatureNightLabel.innerHTML = `ночью + ${night}°`
      rainfallLabel.innerHTML = getRainfallString(snow, rain)
      return componentsObj

      function convertDate(date, inWeekDay) {
        const DateObj = new Date(date)
        return inWeekDay ? getWeekDay(DateObj) : getDate(DateObj)
        function getWeekDay(DateObj) {
          const Days = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
          ]
          if (this.todayWeatherData) {
          	this.todayWeatherData = !this.todayWeatherData
          	return 'Сегодня'
          } else {
          	return Days[DateObj.getDay()]
          }
        }
        function getDate(dateObj) {
          const Months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
          ]
          return `${dateObj.getDate()} ${Months[dateObj.getMonth()]}`
        }
      }
      function getRainfallString(snow, rain) {
        if (snow && rain) {
          return 'дождь со снегом'
        } else if (snow || rain){
          if (snow) return 'снег'
          if (rain) return 'дождь'
        } else {
          return 'без осадков'
        }
      }
    }

    function setAttributsComponents(componentsObj, div, cloudiness, snow, rain) {
      const {
        weekDayLabel,
        currentDateLabel,
        cloudinessDiv,
        temperatureDayLabel,
        temperatureNightLabel,
        rainfallLabel
      } = componentsObj
      div.setAttribute('class', 'item-list')
      weekDayLabel.setAttribute('class', 'week-day-label label margin-horizontal')
      cloudinessDiv.setAttribute("class", `cloudiness-div margin-horizontal`)
      cloudinessDiv.setAttribute("style", `background-image: ${getIconCloudiness(cloudiness, snow, rain)}`)
      currentDateLabel.setAttribute('class', 'current-date-label label margin-horizontal')
      temperatureDayLabel.setAttribute('class', 'temperature-day-label label margin-horizontal')
      temperatureNightLabel.setAttribute('class', 'temperature-night-label label margin-horizontal')
      rainfallLabel.setAttribute('class', 'rainfall-fabel label margin-horizontal')
      return componentsObj

      function getIconCloudiness(cloudiness, snow, rain) {
        switch(cloudiness) {
          case 'Ясно':
            return 'url(assets/svg/sunnyWeather.svg)'
            break
          case 'Малооблачно':
            if (snow && rain) {
            	return 'url(assets/svg/sleet.svg)'
            } else if (snow || rain) {
              if (snow) return 'url(assets/svg/chancesnow.svg)'
              if (rain) return 'url(assets/svg/chancerain.svg)'
            } else {
              return 'url(assets/svg/cloudy.svg)'
            }
            break
          case 'Облачно с прояснениями':
            return 'url(assets/svg/mostlyCloudy.svg)'
            break
          default:
            console.log(`== Log Error - getIconCloudiness ${cloudiness}`)
        }
      }
    }
}

function onClickActions(newWeatherArr, weatherList) {
  const NextButton = document.getElementById('nextButton')
  const BackButton = document.getElementById('backButton')
  const ListLength = newWeatherArr.length
  let List = weatherList
  let indexInitialItem = 0
  let indexAddItem = 3
  BackButton.onclick = () => {
    if (0 !== indexInitialItem) {
		setAttrButton(NextButton, true)
		const NewList = List.cloneNode(false)
		List.parentNode.insertBefore(NewList, List.nextSibling)
		List.remove()
		indexInitialItem = indexInitialItem-1
		indexAddItem = indexAddItem-1
		if (0 === indexInitialItem) {
	      	this.todayWeatherData = !this.todayWeatherData
	      	setAttrButton(BackButton, false)
		}
		const NewArr = newWeatherArr.filter((element, index) => index >= indexInitialItem && index <= indexAddItem)
		setComponentsList(NewArr, NewList)
		List = NewList
    }
  }
  NextButton.onclick = () => {
    if (ListLength !== indexAddItem+1) {
      setAttrButton(BackButton, true)
      List.removeChild([...List.children][0])
      indexInitialItem = indexInitialItem+1
      indexAddItem = indexAddItem+1
      setComponentsList([newWeatherArr[indexAddItem]], List)
      if (ListLength === indexAddItem+1) setAttrButton(NextButton, false)
    }
  }

  function setAttrButton(id, inActive) {
    const Color = inActive ? '#000' : '#c7c7c7'
    id.setAttribute("style", `border-color: ${Color};`)
  }
}
