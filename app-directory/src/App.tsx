import othus from 'othus';

export const App: othus.ITF = {
    body: (req: othus.ITF_body_req, res: othus.ITF_body_res) => {
        const elements: othus.ITFDoc[] = othus.compile(
            <embed>
                <p className="count">0</p>
                <button className="count-btn">count</button>
            </embed>
        );

        res.send(elements, req.path);
    }
}