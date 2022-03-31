<template>
  <header class="header">
    <div class="header-top">
      <div class="wrapper">
        <div class="city-choice">
          <div class="city-choice__geo">
            <img src="./assets/geo.png" alt="значок геометки" width="20" height="20" />
          </div>

          <div class="city-choice__city">
            <span @click="onMenuClick">{{ chosenCity.name }}</span>
            <div v-if="menuShowed" class="city-choice-block">
              <h2 class="city-choice-block__title">
                Ваш город {{ chosenCity.name }}
              </h2>

              <form action="#" method="get">
                <input name="city" type="text" placeholder="Введите город" class="city-choice-block__input"
                  @input="cityInput" />
                <button v-if="cityButton" class="city-choice-block__button">
                  Найти
                </button>
              </form>
              <div class="cities-list">
                <p class="cities-list__city" v-for="item of citiesList" :key="item.id" @click="onCityClick(item)">
                  {{ item.name }}
                </p>
              </div>

              <div>
                <p class="city-choice-block__notice">
                  Не нашли свой населенный пункт в списке? Воспользуйтесь
                  <span class="city-choice-block__notice-choice">поиском.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="header-menu">
        <a class="header-menu__item-promo red" href="#">
          <img class="stock-icon" src="./assets/fire.png" alt="пламя" />Акции</a>
        <a class="header-menu__item" href="#">Готовые решения</a>
        <a class="header-menu__item" href="#">Строительные материалы</a>
        <a class="header-menu__item" href="#">Керамическая плитка</a>
        <a class="header-menu__item" href="#">Краски</a>
        <a class="header-menu__item" href="#">Сантехника</a>
        <a class="header-menu__item" href="#">Напольные покрытия</a>
        <a class="header-menu__item" href="#">Товары для дома</a>
      </div>
    </div>
  </header>

  <section class="wrapper">
    <h1>Рекламные возможности <span class="red">akson.ru</span></h1>

    <div class="visitors-info">
      <h2 class="visitors-info__title">Аудитория сайта</h2>
      <div class="visitors-info__visualization">
        <div class="visitors-info__traffic">
          <h3 class="visitors-info__block-title">Посещаемость</h3>
          <div class="visitors-info__visualization-wrapper">
            <div>
              <img src="./assets/vertical-chart.jpg" alt="вертикальная диаграмма" />
            </div>
            <div class="description">
              <div class="preloader" v-if="fetching">
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div class="description__item" v-for="(item, i) of chosenCityInfo" :key="i">
                <div class="eye-image">
                  <img class="eye-image" src="./assets/eye.png" alt="значок око" />
                </div>
                <div>
                  <p class="description__item-value">{{ item.value }}</p>
                  <p>{{ item.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="visitors-info__gender">
          <h3 class="visitors-info__block-title">Пол</h3>
          <div class="visitors-info__visualization-wrapper">
            <div class="visitors-info__visualization-pic">
              <img src="./assets/round-chart.jpg" alt="круговая диаграмма" />
            </div>
            <div class="description">
              <ul class="gender-list">
                <li class="light-red">Мужской</li>
                <li class="light-blue">Женский</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="visitors-info__age">
          <h3 class="visitors-info__block-title">Возраст</h3>
          <div class="visitors-info__visualization-wrapper">
            <div class="visitors-info__visualization-pic">
              <img src="./assets/round-hollow-chart.jpg" alt="круговая полая диаграмма" />
            </div>
            <div class="description">
              <ul class="age-list">
                <li class="light-green">25-34 года</li>
                <li class="light-yellow">35-44 года</li>
                <li class="dark-red">45-54 года</li>
                <li class="light-blue">55 лет и старше</li>
                <li class="violet">18-24 года</li>
                <li class="light-grey">Остальные</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    apiGetCitiesList,
    apiGetCityInfo
  } from "./fns";

  export default {
    data() {
      return {
        menuShowed: false,
        cityButton: false,
        citiesList: [],
        chosenCity: {},
        chosenCityInfo: [],
        fetching: false,
      };
    },

    methods: {
      onMenuClick() {
        this.menuShowed = !this.menuShowed;
      },
      cityInput() {
        this.cityButton = true;
      },
      async onCityClick(item) {
        this.chosenCity = item;
        this.menuShowed = false;
        this.fetching = true;
        this.chosenCityInfo = await apiGetCityInfo(item.id);
        this.fetching = false;
      },
      onClickOutsideHandler(event){
        if (event.target.closest(".city-choice__city")) return;
        this.menuShowed = false;
      }
    },

    async mounted() {
      this.fetching = true;
      this.citiesList = await apiGetCitiesList();
      this.fetching = false;
      this.chosenCity = this.citiesList[0];
      this.chosenCityInfo = await apiGetCityInfo(this.chosenCity.id);
      document.addEventListener("click", this.onClickOutsideHandler);
    },
    unmounted() {
      document.removeEventListener("click", this.onClickOutsideHandler);
    },
  };
</script>

<style scoped lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  .wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  .header-top {
    background: linear-gradient(90deg, #0099dc 0%, #9f1c6e 62.5%, #ff0803 100%);
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;

    .city-choice {
      display: flex;
      cursor: pointer;

      &__geo {
        margin-right: 10px;
      }

      &__city {
        font-family: "Open Sans", sans-serif;
        font-weight: 700;
        color: white;
        font-size: 16px;
        margin-right: 25px;
        position: relative;
      }

      .city-choice-block {
        width: 640px;
        padding: 28px;
        border-radius: 0 0 8px 8px;
        z-index: 2;
        position: absolute;
        background-color: white;
        box-shadow: 0 6px 9px rgb(0 0 0 / 25%);

        &__title {
          font-family: "Open Sans", sans-serif;
          font-size: 24px;
          margin-bottom: 25px;
          font-weight: 700;
          color: black;
        }

        &__input {
          width: 380px;
          padding: 13px;
          border: 1px solid #c7cad1;
          border-radius: 4%;
          font-size: 16px;
          margin-right: 15px;
        }

        &__button {
          background-color: #0099dc;
          color: white;
          font-family: "Open Sans", sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 12px;
          border: none;
          border-radius: 5%;
          cursor: pointer;
        }

        &__notice {
          font-family: "Open Sans", sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #9da2ae;
        }

        &__notice-choice {
          text-decoration: underline;
          cursor: pointer;
        }

        &__notice-choice:hover {
          color: #0099dc;
        }

        .cities-list {
          display: flex;
          flex-flow: column wrap;
          margin-top: 25px;
          height: 200px;

          &__city {
            font-family: "Open Sans", sans-serif;
            font-weight: 400;
            color: #3a3e46;
            font-size: 14px;
            margin-bottom: 14px;
            cursor: pointer;
          }

          &__city:hover {
            color: #0099dc;
          }
        }
      }
    }
  }

  .header-menu {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 35px;

    &__item {
      font-family: "Open Sans", sans-serif;
      font-weight: 400;
      color: #23252a;
      font-size: 14px;
    }

    &__item:hover {
      color: #9da2ae;
    }

    &__item-promo {
      display: flex;
      font-family: "Open Sans", sans-serif;
      font-weight: 600;
      font-size: 14px;
    }
  }

  h1 {
    padding-top: 25px;
    padding-bottom: 37px;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 44px;
    text-align: center;
  }

  .visitors-info {
    padding-top: 15px;
    margin-bottom: 30px;

    &__title {
      font-family: "Open Sans", sans-serif;
      font-weight: 600;
      font-size: 40px;
      text-align: center;
    }

    &__visualization {
      padding-top: 35px;
      display: flex;
      justify-content: space-between;
    }

    &__visualization-wrapper {
      display: flex;
    }

    &__block-title {
      font-family: "Open Sans", sans-serif;
      font-weight: 400;
      font-size: 17px;
      text-align: center;
      margin-bottom: 15px;
    }

    &__traffic {
      width: 430px;
    }

    &__visualization-pic {
      margin-right: 30px;
    }

    .description {
      padding-top: 12px;

      &__item {
        display: flex;
        padding-bottom: 10px;
      }

      &__item-value {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }

  .red {
    color: red;
  }

  li::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 6px;
    margin-right: 6px;
    vertical-align: middle;
    //background-color: #77b6e7;
  }

  .light-red::before {
    background-color: #fd5a3e;
  }

  .light-blue::before {
    background-color: #77b6e7;
  }

  .light-green::before {
    background-color: #81ae56;
  }

  .light-yellow::before {
    background-color: #ffd963;
  }

  .dark-red::before {
    background-color: #cf2f36;
  }

  .violet::before {
    background-color: #a955b8;
  }

  .light-grey::before {
    background-color: #f3f1ed;
  }

  .stock-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .eye-image {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .preloader {
    z-index: 100;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid aqua;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: aqua transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    min-width: 1240px;
  }
</style>