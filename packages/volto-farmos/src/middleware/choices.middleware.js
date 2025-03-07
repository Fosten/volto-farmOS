import WholeTypeResponse from '../controllers/choices.controller';

export default async function FarmChoices(req, res, next) {
  const farmChoices = req.farm;
  const wtr = await WholeTypeResponse(farmChoices);

  const ltr = wtr[0];
  const ptr = wtr[1];
  res.json({
    ltr: ltr,
    ptr: ptr,
  });
}
