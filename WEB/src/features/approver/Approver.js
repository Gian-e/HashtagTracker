import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTweetsAsync,
  selectTweetsApproved,
  selectTweetsPending,
  deleteTweet,
  pushApproved,
  tweetsApprovedPath,
  tweetsPendingPath,
  pushToTop,
  selectHashtag,
  setHashtag,
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
  InputGroup,
  FormControl,
} from "react-bootstrap";

export function Approver() {
  const dispatch = useDispatch();
  //const tweets = response;
  const tweets = useSelector(selectTweetsPending);
  const tweetsApproved = useSelector(selectTweetsApproved);
  const hashtag = useSelector(selectHashtag);
  const [thisHashtag, setThisHashtag] = useState(hashtag);

  useEffect(async () => {
    if (thisHashtag == "") {
      setThisHashtag(hashtag);
    }
  });

  const goToUserPage = (userName) => {
    window.open("https://www.twitter.com/" + userName, "_blank");
  };

  return (
    <div>
      Approver
      <Container style={{ width: "100vw" }}>
        <Row className="justify-content-md-left  mb-5">
          <Col md="auto">
            <Card className="p-2">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                <FormControl
                  value={thisHashtag}
                  onChange={(e) => setThisHashtag(e.target.value)}
                  placeholder="Hashtag"
                  aria-label="Hashtag"
                />
                <Button
                  variant="primary"
                  id="button-addon2"
                  onClick={() => dispatch(setHashtag(thisHashtag))}
                >
                  Alterar
                </Button>
              </InputGroup>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm="12" md="6">
            <h2>Pendentes</h2>
            <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
                {tweets == null || tweets.length == 0 ? (
                  <ListGroup.Item>
                    <div>Buscando...</div>
                  </ListGroup.Item>
                ) : (
                  tweets.map((tweet) => {
                    return (
                      <ListGroup.Item>
                        <Container>
                          <Row>
                            <Col sm="11">
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
                            <Col sm="1">
                              <ButtonGroup vertical>
                                <Button
                                  variant="success"
                                  title="Aprovar"
                                  onClick={() => {
                                    dispatch(pushApproved(tweet));
                                  }}
                                >
                                  ✓
                                </Button>
                                <Button
                                  variant="danger"
                                  title="Remover"
                                  onClick={() => {
                                    dispatch(
                                      deleteTweet({
                                        tweet,
                                        dbPath: tweetsPendingPath,
                                      })
                                    );
                                  }}
                                >
                                  ✗
                                </Button>
                              </ButtonGroup>
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
          <Col sm="12" md="6">
            <h2>Aprovados</h2>
            <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
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
                            <Col sm="11">
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
                            <Col sm="1">
                              <ButtonGroup vertical>
                                <Button
                                  variant="primary"
                                  title="No Topo"
                                  onClick={() => {
                                    dispatch(pushToTop(tweet));
                                  }}
                                >
                                  🠕
                                </Button>
                                <Button
                                  variant="danger"
                                  title="Remover"
                                  onClick={() => {
                                    dispatch(
                                      deleteTweet({
                                        tweet,
                                        dbPath: tweetsApprovedPath,
                                      })
                                    );
                                  }}
                                >
                                  ✗
                                </Button>
                              </ButtonGroup>
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
    </div>
  );
}

const response = [
  {
    author_id: "4025725636",
    id: "1500679357764976641",
    text: "Eslo putassa com o gustavo por causa da lais\n#BBB",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1417329537327804431/KzgGH8QO_normal.jpg",
      id: "4025725636",
      username: "ale_alvez1",
      name: "Ale Alvez comentando o #BBB22 pq nao fui chamada",
    },
  },
  {
    author_id: "3344034316",
    id: "1500679355588124675",
    text: "Tudo bem vou ser sincera, nunca perdi meu tempo votando em BBB, mas nesse eu faço questão, pq soberba é um negócio que não me desce! #bbb #FORAJADEARROGANTE #ForaJade #ForaJaDeu",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1489025674312572929/1LccXMPu_normal.jpg",
      id: "3344034316",
      username: "RacheleCastro",
      name: "Rachele Castro",
    },
  },
  {
    author_id: "1330252207736885248",
    id: "1500679354229170176",
    text: 'quero o Tadeu falando na terça feira "ARTHUR, VC NEM PASSOU PERTO DE SAIR, QUEM SAI HOJE É VOCÊ, JADE" #ForaJade #ParedaoBBB #bbb22 #bbb',
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1498701592429830145/qdcAP4tF_normal.jpg",
      id: "1330252207736885248",
      username: "juulieny",
      name: "juulieny",
    },
  },
  {
    author_id: "1490890453985730560",
    id: "1500679348453621765",
    text: "Jade uuuuu #ForaJade #bbb",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1500417721816825857/vh7kZWPI_normal.jpg",
      id: "1490890453985730560",
      username: "GabrieleVahldi2",
      name: "Gabriele Vahldick",
    },
  },
  {
    author_id: "1461515857390092289",
    id: "1500679348415832064",
    text: "A mina é Podre de rica Nunca Deu Nada Pra Ngm Agr ta No #bbb pra doar o premio 🤣🤣🤣🤣🤣🤣🤣 \nInfelizmente esse premio nunca terá sua escrota nojenta  🤣🤣🤣🤣 @jadepicon #ForaJade #ForaJadePiton #FicaArthur #arthurcampeao 🙅🏻‍♂",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1461516212123357187/J_fIslNi_normal.jpg",
      id: "1461515857390092289",
      username: "Renatofranca388",
      name: "Renato França",
    },
  },
  {
    author_id: "131059506",
    id: "1500679345526001664",
    text: "A soberba da Jade pode até ser aspiracional para as meninas novinhas q são o público dela (minha filha de 8 anos quase me cancela por ñ curti-la!); mas quem decide #BBB desde 2002 não é o Twitter nem mt menos a gen Z. E a turma do sofá não tem nem dúvida de quem quer eliminar!",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1078697725015793665/TNQSE5i4_normal.jpg",
      id: "131059506",
      username: "alegarattoni",
      name: "Ale Garattoni",
    },
  },
  {
    author_id: "227156035",
    id: "1500679328111153154",
    text: "O MUNDO EM GUERRA E A JADE COM DISCURSO DE ÓDIO NO #BBB GRITANDO PRO ARTHUR SAIR.\n\nDITO ISSO, #ForaJade",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1360633708416557057/cjeYYQfj_normal.jpg",
      id: "227156035",
      username: "MauricioAmoriim",
      name: "Maurício Amorim",
    },
  },
  {
    author_id: "1403431757895159812",
    id: "1500679324231421952",
    text: "#FORAJADE #FORAJESSI #FORAARTHUR #FICAJADE #FICAJESSI #FICAARTHUR #BBB \nhttps://t.co/LKwcRXaJ0a",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1500620628801593345/fPkkOLQU_normal.jpg",
      id: "1403431757895159812",
      username: "sungkaangster",
      name: "hourly sir sungkang",
    },
  },
  {
    author_id: "1079391358803197953",
    id: "1500679307898806273",
    text: "Gente, a Jade é ridícula, apelando pra caridade, mds, se tú quer ajudar, usa sua grana que você tem e não é pouca, pode usar seu insta, YouTube e tudo mais, meu Deus🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️ #bbb . Tags: #bbb22 #redebbb Prior #forajade #ParedaoBBB",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1323440972299120640/3ON6I5wb_normal.jpg",
      id: "1079391358803197953",
      username: "GohanSemVidel",
      name: "Léo",
    },
  },
  {
    author_id: "1129205358994567168",
    id: "1500679303469613056",
    text: "E vamos de primeira vez votando nessa edição? #ForaJade #ForaJadePiton #FicaArthur #Jadeu #BBB",
    user: {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1244755265301381122/fAJGj2GN_normal.jpg",
      id: "1129205358994567168",
      username: "walkerfisio",
      name: "Walker Martins",
    },
  },
];
