import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";


function PopUp(props) {

    const [show, setShow] = useState(false);

    //Closes Modal
    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);

    return (
        <>
            <img src={props.row.item.img} alt="/derek.jpg" onClick={handleShow}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.row.listing_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                      <img src={props.row.item.img} alt="/derek.jpg" onClick={handleShow}/>
                    </div>
                    <div>
                      Overall: {props.row.item.ovr}
                    </div>
                    <div>
                      Rarity: {props.row.item.rarity}
                    </div>
                    <div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUp;