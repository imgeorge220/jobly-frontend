import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import addCommas from '../helpers/addCommas';
import JoblyApi from '../helpers/JoblyApi';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [hasApplied, setHasApplied] = useState(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const getJobs = async () => {
      const user = await JoblyApi.getUser(username);
      const jobs = user.jobs;
      const userHasApplied = jobs.some(userJob => userJob.id === job.id);
      setHasApplied(userHasApplied);
    }
    getJobs();
  }, [username, job])


  const handleApply = async evt => {
    evt.preventDefault();
    await JoblyApi.apply(job.id, username);
    setHasApplied(true);
  }

  return (
    <Card className="JobCard mb-3">
      <Container>
        <Card.Body>
          <Row>
            <Col>
              <h4 >{job.title}</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={8} md={10}>
              <div >Salary: {`$${addCommas(job.salary)}`}</div>
              <div >Equity: {`${job.equity * 100}%`}</div>
            </Col>
            <Col className='JobCard-btn-container' xs={4} md={2}>
              {
                hasApplied ?
                  <Button variant="info" size='md' disabled>APPLIED</Button> :
                  <Button variant="success" size='md' onClick={handleApply}>APPLY</Button>
              }
            </Col>
          </Row>
        </Card.Body>
      </Container>
    </Card>
  );
}

export default JobCard;