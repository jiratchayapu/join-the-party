import './PartyItem.css';
import { Form, Icon, Input, Button, Typography, Row, Popconfirm, message, Col, Image } from 'antd';

function PartyItem(props){
  const {party, onClickJoin} = props;
    return(<div className="party-item">
    <img src={party.picture ? party.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqhMfmVPGd1wpu9Bucc2vToj8zTowaXiJMjGv9Q1Wb0RS1a-g53z9EQH7uT-TXNjgeOxQ&usqp=CAU"}></img>
    <div className='title'>{party.name}</div>
    <Row>
      <Col span={12}>
      <div className='people'>{party.remainingPeople} / {party.attendance}</div>
      </Col>
      <Col span={12} style={{textAlign: 'right'}}>
        <Button
          id={party._id}
          className={party.joined ? 'item-button-2' : 'item-button'}
          icon={party.joined ? "Disjoin" : "Join"}
          type="primary"
          shape="round"
          size="small"
          onClick={onClickJoin}
      />
      </Col>
    </Row>
  </div>
  );
}

export default PartyItem;