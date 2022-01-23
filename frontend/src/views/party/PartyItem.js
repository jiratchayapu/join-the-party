import './PartyItem.css';
import { Form, Icon, Input, Button, Typography, Row, Popconfirm, message, Col, Image } from 'antd';

function PartyItem(props){
  const {party, onClickJoin} = props;
    return(<div className="party-item">
    <img src={party.picture ? party.picture : "error"}></img>
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