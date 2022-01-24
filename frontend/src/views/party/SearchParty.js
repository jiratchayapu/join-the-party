import { useState, useEffect } from 'react';
import './SearchParty.css';
import AppSearch from './AppSearch';
import PartyItem from './PartyItem';
import { Typography, Col, Row, Button, message } from 'antd';
import * as api from '../../lib/api'
const { Title } = Typography;

function SearchParty() {
  const [searchText, setSearchText] = useState('');
  const [parties, setParties] = useState([]);
  useEffect(() => {
    getAllParty()
  }, [])
  const columnLayout = { xs: { span: 6 }, md: { span: 10 }, lg: { span: 14 }, xl: { span: 16 }, xxl: { span: 18 } };
  const columnLayout2 = { xs: { span: 9 }, md: { span: 6 }, lg: { span: 5 }, xl: { span: 4 }, xxl: { span: 3 } };

  async function getAllParty() {
    try {
      console.log(JSON.parse(sessionStorage.getItem("token")))
      const data = await api.party.get(JSON.parse(sessionStorage.getItem("token")))
      data.forEach(element => element['joined'] = false)
      console.log(data)
      setParties(data)
      message.success('Load success!')
    } catch (error) {
      console.log(error)
      message.error('Load failed please try again')
    }
  }
  const filteredParty = parties.filter((party) => {
    return party.name.includes(searchText)
  })

  async function onClickJoinParty(party){
    try {
      console.log(party.target.id)
      const data = await api.party.join({
        'user_id': JSON.parse(sessionStorage.getItem("token")),
        'party_id': party.target.id
      })
      console.log(data)
      message.success('Join Party Success!')
      getAllParty()
    } catch (error) {
      console.log(error)
      message.error('Join Party failed please try again')
    }
  }

  const partyElements = filteredParty.map((party, index) => {
    return <PartyItem key={index} party={party} onClickJoin={onClickJoinParty}/>
  })
  const createParty = () => {
    window.location.href='/create-party'
  }
  
  return (
    <div className="app">
    <Row>
      <Col {...columnLayout} className='create-party'>
      <Button
            icon={'+'}
            className='create-party-button'
            type="primary"
            shape="circle"
            size="large"
            onClick={createParty}
        />
      </Col>
      <Col {...columnLayout2} className='my-party'>
      <Button
            icon={'My party'} 
            className='my-party-button'
            type="primary"
            shape="round"
            size="large"
            onClick={() => window.location.href='/my-parties'}
        />
      </Col>
      <Col {...columnLayout2} className='logout'>
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
      <Title className='all-party'>PARTY</Title>
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

export default SearchParty;
