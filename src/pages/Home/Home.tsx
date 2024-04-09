import { FC, useEffect } from "react";
import "./Home.css";

export const Home: FC = () => {
  useEffect(() => {}, []);
  return (
    <div className="home">
      <section className="first">
        <div className="first-content">
          <h1>Эффективная доставка товаров</h1>
          <button>
            <svg
              className="button-svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="arrow-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              data-testid="icon-test"
            >
              <path
                fill="currentColor"
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              ></path>
            </svg>
            Узнать больше
          </button>
        </div>
      </section>
      <section className="second">
        <div className="second-left">
          <h2>Доставка товаров потребителям</h2>
          <div className="second-left-div">
            Компании могут использовать нашу платформу для эффективной доставки
            своих готовых товаров покупателям, организуя маршруты между
            складами, магазинами и пунктами выдачи. Покупатели могут легко
            заказать доставку товаров в ближайший пункт выдачи.
          </div>
        </div>
        <div className="second-right">
          <div className="icon-text">
            <span>
              <svg
                className="second-svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bullseye"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-testid="icon-test"
              >
                <path
                  fill="currentColor"
                  d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                ></path>
              </svg>
            </span>
            <h4>Склады</h4>
            <div>
              Хранение товаров на складах в ожидании заказов на доставку
            </div>
          </div>
          <div className="icon-text">
            <span>
              <svg
                className="second-svg"
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="circle"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-testid="icon-test"
              >
                <path
                  fill="currentColor"
                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                ></path>
              </svg>
            </span>
            <h4>Доставка</h4>
            <div>
              Организация эффективных маршрутов доставки товаров покупателям
            </div>
          </div>
        </div>
        <div className="second-img">
          <img
            src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/photo-1700718008794-3db41f8d6c16-fWhmd.jpeg"
            alt="delivery network"
          />
        </div>
      </section>
      <section className="third">
        <div className="third-left">
          <div className="third-first third-content">
            <p>О сервисе Shark Cat:</p>
            <h2>Доставка по всему миру</h2>
            <div>
              Shark Cat специализируется на организации быстрой и удобной
              доставки готовых изделий от производителей до покупателей. Мы
              работаем с производителями со всего мира, помогая им
              оптимизировать логистику и сократить расходы на доставку. А
              покупатели получают возможность быстро и просто заказывать готовые
              изделия из любой точки мира.
            </div>
            <button className="third-button">Узнать больше</button>
          </div>
        </div>
        <div className="third-right">
          <div className="third-container">
            <img
              src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/photo-1616703833506-fd23c01c3e8f-ha2kx.jpeg"
              alt="fast delivery"
              className="third-img"
            />
            <div className="third-content">
              <h3>Сокращение расходов</h3>
              Благодаря автоматизированной системе логистики Shark Cat позволяет
              производителям экономить на транспортировке и доставке своих
              товаров. Мы находим оптимальные маршруты и сокращаем простои.
            </div>
          </div>
          <div className="third-container">
            <img
              className="third-img"
              src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/photo-1571867424488-4565932edb41-9gqKN.jpeg"
              alt="online orders"
            />
            <div className="third-content">
              <h3>Удобные заказы</h3>
              Покупатели могут легко и быстро оформлять заказы на сайте или в
              мобильном приложении Shark Cat. Также доступны отслеживание заказа
              и удобные способы оплаты.
            </div>
          </div>
        </div>
      </section>
      <section className="fourth">
        <div className="fourth-content">
          <h2>Основные возможности</h2>
          <div className="fourth-tit-text">
            Мы предлагаем несколько ключевых возможностей для эффективной
            доставки вашей продукции.
          </div>
        </div>
        <div className="fourth-items">
          <div className="fourth-item">
            <div className="fourth-text">Пути</div>
            <h3>Оптимизация маршрутов</h3>
            <a href="/paths" className="fourth-item-span">
              Навигация
            </a>
            <img
              src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/photo-1600320254374-ce2d293c324e-5G6az.jpeg"
              alt="delivery truck"
            />
          </div>
          <div className="fourth-item">
            <div className="fourth-text">Цены</div>
            <h3>Прозрачное ценообразование</h3>
            <a href="/" className="fourth-item-span">
              Тарифы
            </a>
            <img
              src="https://cdn.dorik.com/661154201d6c29001119b9a0/images/photo-1571907483091-fbe746bee132-jPZL1.jpeg"
              alt="price tag"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
