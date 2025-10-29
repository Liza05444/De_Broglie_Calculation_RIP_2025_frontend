import { type FC } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import bannerImage from '../../assets/banner.png';
import './HomePage.css';

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <BreadCrumbs crumbs={[]} />
      
      <div className="banner-container">
        <div className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
        </div>
        <h1 className="banner-title">Расчет длины волны де Бройля</h1>
      </div>
      
      <Container className="home-content">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="welcome-card">
              <Card.Body>
                <Card.Title className="welcome-title">
                  Добро пожаловать!
                </Card.Title>
                <div className="welcome-features">
                  <Carousel interval={8000} indicators={false} controls={true}>
                    <Carousel.Item>
                      <div className="carousel-content">
                        <h5>Возможности</h5>
                        <ul>
                          <li>Просмотр каталога частиц</li>
                          <li>Фильтрация частиц по названию</li>
                          <li>Детальная информация о каждой частице</li>
                          <li>Создание заявок на расчет длины волны де Бройля</li>
                        </ul>
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <div className="carousel-content">
                        <h5>Как использовать</h5>
                        <ol>
                          <li>Перейдите в раздел "Частицы"</li>
                          <li>Выберите интересующие Вас частицы</li>
                          <li>Изучите детальную информацию о них</li>
                          <li>Создайте заявку на расчет длины волны де Бройля для частиц</li>
                        </ol>
                      </div>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <footer className="footer">© 2025 University of Colorado. Все права защищены.</footer>
    </div>
  );
};
