import WholeTypeResponse from '../controllers/choices.controller';

export default async function FarmChoices(req, res, next) {
  try {
    const wtr = await WholeTypeResponse();

    const ltr = wtr[0];
    const ptr = wtr[1];
    res.json({
      ltr: ltr,
      ptr: ptr,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in okgo2 function:', err);
    res.status(500).send(err);
  }
}
