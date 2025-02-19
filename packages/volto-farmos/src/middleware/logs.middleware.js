import WholeDataResponse from '../controllers/logs.controller';
import SetFilter from '../utils/filter.util';
import SetStaticFilter from '../utils/staticfilter.util';

export default async function FarmLogs(req, res, next) {
  try {
    const dataProps = req.body; // Read data props from the request body
    const filterOK = await SetFilter(dataProps); // Pass data props to SetFilter
    const filterNO = SetStaticFilter();

    let wdr;
    if (dataProps) {
      wdr = await WholeDataResponse(filterOK);
    } else {
      wdr = await WholeDataResponse(filterNO);
    }

    res.json({
      wdr: wdr,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in okgo function:', err);
    res.status(500).send(err);
  }
}
