import React from 'react';
import { Button } from 'react-bootstrap';
import { ROUTES } from '../../../configs/routes';
import { Link } from 'react-router-dom';
interface Props {}

const HomePage = (props: Props) => {
  const newRoutes: string[] = Object.values(ROUTES);
  const title: string[] = Object.keys(ROUTES);
  return (
    <div className="d-flex p-3" style={{ height: '50px' }}>
      {title.map((el: string, index: number) => {
        return (
          <Link to={newRoutes[index]} key={index} className="ms-5">
            <Button key={index}>{el}</Button>
          </Link>
        );
      })}
    </div>
  );
};

export default HomePage;
