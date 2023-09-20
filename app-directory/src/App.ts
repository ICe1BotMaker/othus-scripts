import othus from 'othus';

const cors = () => () => {};

export const App: othus.ITF = {
    middleware: [cors()],
    stateOptions: (option: othus.ITF_stateOptions_option) => option,
    body: (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
        res.state(`text`, `0`);

        const count = (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
            res.state(`text`, res.state(`text`) + 1);
        };
				
        const elements: othus.ITFDoc[] = othus.compile(
            <p className="count">{res.state(`text`)}</p>
            <p className="count-btn" onClick={count}>count</p>
        );

        res.send(elements, req.path);
    }
}