import { useState, useEffect } from 'react';
import './MyParty.css';
import AppSearch from './AppSearch';
import PartyItem from './PartyItem';
import { Typography, Col, Row, Button, message } from 'antd';
import * as api from '../../lib/api'
import logo from '../../img/logo_black.png'
const { Title } = Typography;

function MyParty() {
  const [searchText, setSearchText] = useState('');
  const [parties, setParties] = useState([]);
  const columnLayout = { xs: { span: 14 }, md: { span: 16 }, lg: { span: 18 }, xl: { span: 20 }, xxl: { span: 22 } };
  const columnLayout2 = { xs: { span: 5 }, md: { span: 4 }, lg: { span: 3 }, xl: { span: 2 }, xxl: { span: 1 } };
  useEffect(() => {
    getAllParty()
  }, [])

  async function getAllParty() {
    try {
      console.log(JSON.parse(sessionStorage.getItem("token")))
      const data = await api.party.getMyParties(JSON.parse(sessionStorage.getItem("token")))
      data.forEach(element => element['joined'] = true)
      console.log('Party: ', data)
      setParties(data)
    } catch (error) {
      console.log(error)
      message.error('Load failed please try again')
    }
  }
  const filteredParty = parties.filter((party) => {
    return party.name.toLowerCase().includes(searchText.toLowerCase())
  })

  async function onClickDisjoinParty(party){
    try {
      console.log(party.target.id)
      const data = await api.party.disjoin({
        'user_id': JSON.parse(sessionStorage.getItem("token")),
        'party_id': party.target.id
      })
      console.log(data)
      message.success('Disjoin Party Success!')
      getAllParty()
    } catch (error) {
      console.log(error)
      message.error('Disjoin Party failed please try again')
    }
  }

  const partyElements = filteredParty.map((party, index) => {
    return <PartyItem key={index} party={party} onClickJoin={onClickDisjoinParty}/>
  })
  const createParty = () => {
    window.location.href='/create-party'
  }
  

  return (
    <div className="app">
    <Row>
      <Col {...columnLayout2}  className='create-party'>
      <Button
            icon={'+'}
            className='create-party-button'
            type="primary"
            shape="circle"
            size="large"
            onClick={createParty}
        />
      </Col>
      <Col {...columnLayout2}  className='back-party'>
      <Button
            icon={'back'}
            className='back-party-button'
            type="primary"
            shape="round"
            size="large"
            onClick={() => window.location.href='/parties'}
        />
      </Col>
      <Col {...columnLayout}  className='logout'>
      <Button
            icon={'Log out'}
            className='logout-button'
            type="primary"
            shape="round"
            size="large"
            onClick={()=>{
              window.location.href='/';
              sessionStorage.removeItem("token");
            }}
        />
      </Col>
    </Row>
    <div>
    <Row
              type="flex"
              align="middle"
              justify="center"
          >
              <img className="my-party-logo" src={logo}/>
          </Row>
      <Title level={2} className='all-party'>my party</Title>
      <section className="app-section">
        <div className="app-container">
          <AppSearch value={searchText} onValueChange={setSearchText}/>
          <div className="app-grid">
            {partyElements}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

export default MyParty;
