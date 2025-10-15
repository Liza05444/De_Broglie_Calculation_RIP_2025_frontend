import { type FC } from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import './HomePage.css';

export const HomePage: FC = () => {
  return (
    <div className="home-page">
      <BreadCrumbs crumbs={[]} />
      
      <div className="banner-container">
        <div className="banner">
          <img src="/src/assets/banner.png" alt="Banner" className="banner-image" />
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
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Возможности</Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          <li>Просмотр каталога элементарных частиц</li>
                          <li>Фильтрация частиц по названию</li>
                          <li>Детальная информация о каждой частице</li>
                          <li>Создание заявок на расчет длины волны де Бройля</li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
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
