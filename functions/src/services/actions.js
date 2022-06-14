import { dbConnect } from "../gateway/dbConnect.js";

export function getAllRecords(req, res) {
  const db = dbConnect();
  db.collection("cardiary")
    .get()
    .then((snap) => {
      const recordCollection = snap.docs.map((doc) => {
        let record = doc.data();
        record.id = doc.id;
        return record;
      });
      res.send(recordCollection);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function getSingleRecord(req, res) {
  const { recordId } = req.params;
  if (!recordId) {
    res.status(401).send("Cannot perform operation");
    return;
  }
  const db = dbConnect();
  db.collection("cardiary")
    .doc(recordId)
    .get()
    .then((doc) => {
      let record = doc.data();
      record.id = doc.id;
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function addRecord(req, res) {
  if (!req.body) {
    return;
  }
  const db = dbConnect();
  db.collection("cardiary")
    .add(req.body)
    .then((doc) => {
      res.send("Entry added!" + doc.id);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function updateMileage(req, res) {
  const { recordId } = req.params;
  if (!req.body || !req.params || !req.params.recordId) {
    res.status(401).send("Cannot perform operation");
    return;
  }
  const db = dbConnect();
  db.collection("cardiary")
    .doc(recordId)
    .update(req.body)
    .then(() => {
      res.send("Record updated");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function addMPG(req, res) {
  const { recordId } = req.params;
  if (!req.body || !req.params || !req.params.recordId) {
    res.status(401).send("Cannot perform operation");
    return;
  }
  const db = dbConnect();
  db.collection("cardiary")
    .doc(recordId)
    .set({ mpg: req.body.mpg }, { merge: true })
    .then(() => {
      res.send("MPG updated");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
