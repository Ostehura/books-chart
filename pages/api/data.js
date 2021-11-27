import DATA from '../Data.json'

export default function handler(req, res) {
  res.status(200).json(DATA)
}
