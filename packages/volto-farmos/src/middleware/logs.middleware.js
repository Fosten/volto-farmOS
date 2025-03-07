import WholeDataResponse from '../controllers/logs.controller';
import SetFilter from '../utils/filter.util';
import SetStaticFilter from '../utils/staticfilter.util';

export default async function FarmLogs(req, res, next) {
  const dataProps = req.body;
  const filterOK = await SetFilter(dataProps);
  const filterNO = SetStaticFilter();
  let wdr;
  const farmData = req.farm;

  if (dataProps) {
    wdr = await WholeDataResponse(filterOK, farmData);
    return res.json({ wdr });
  } else {
    wdr = await WholeDataResponse(filterNO, farmData);
    return res.json({ wdr });
  }
}
