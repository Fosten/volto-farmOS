import WholeDataResponse from '../controllers/logs.controller';
import SetFilter from '../utils/filter.util';
import SetStaticFilter from '../utils/staticfilter.util';

export default async function FarmLogs(req, res, next) {
  try {
    const dataProps = req.body; // Read data props from the request body
    const filterOK = await SetFilter(dataProps); // Pass data props to SetFilter
    const filterNO = SetStaticFilter();
    let wdr;
    const farmData = req.farm;

    if (dataProps) {
      wdr = await WholeDataResponse(filterOK, farmData);
      return res.json({ wdr });
    } else {
      wdr = await WholeDataResponse(filterNO, farmData);s
      return res.json({ wdr });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in FarmLogs function:', err);
    res.status(500).send(err);
  }
}
