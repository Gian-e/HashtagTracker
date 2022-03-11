import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTweetsAsync,
  selectTweetsApproved,
  selectHashtag
} from "./ApproverSlice";
import styles from "./Approver.module.css";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";

export function Panel() {
  const dispatch = useDispatch();
  const tweetsApproved = useSelector(selectTweetsApproved);
  const hashtag = useSelector(selectHashtag);
  
  useEffect(async () => {
    if (tweetsApproved == null || tweetsApproved.length == 0) {
      dispatch(await getTweetsAsync());
    }
  });

  const goToUserPage = (userName) => {
    window.open("https://www.twitter.com/" + userName, "_blank");
  };

  return (<div>  <Container style={{ width: "110vw" }}>
  <Row className="justify-content-md-center">
    <Col md="auto">
      <h1>#{hashtag}</h1>
      <Card style={{margin:"30px"}}>
        <ListGroup variant="flush" style={{ width: "35rem" }}>
          {tweetsApproved == null || tweetsApproved.length == 0 ? (
            <ListGroup.Item>
              <div>Nenhum tweet aprovado</div>
            </ListGroup.Item>
          ) : (
            tweetsApproved.map((tweet) => {
              return (
                <ListGroup.Item>
                  <Container>
                    <Row>
                      <Col sm="2">
                          <img src={tweet.user.profile_image_url} 
                          style={{  borderRadius: '50%'
                          }}></img>
                      </Col>
                      <Col sm="10">
                        <div>{tweet.text}</div>
                        <div>
                          <span
                            className={styles.authorUser}
                            onClick={() =>
                              goToUserPage(tweet.user.username)
                            }
                          >
                            @{tweet.user.username}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              );
            })
          )}
        </ListGroup>
      </Card>
    </Col>
  </Row>
</Container>
</div>)
}
