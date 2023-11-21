const DomainInstructionsContent = ({ onClose }) => (
  <div className="DomainModal__Main">
    <div className="DomainModal__Title">
      Instructions on how to add an A-Record{" "}
    </div>
    <div className="DomainModal__Description">
      <div className="Description__Step">
        <div className="Step__Title">Step 1.</div>
        <div className="Step__Description">
          <div>
            Login to your domain register account (e.g. GoDaddy, NameCheap,
            Google Domains), then locate
          </div>
          <div> the DNS settings or management page for your domain.</div>
        </div>
      </div>
      <div className="Description__Step">
        <div className="Step__Title">Step 2.</div>
        <div className="Step__Description">
          <div>
            Add A-Records. Add A-records inorder to use your root domain(i.e
            custom domain).
          </div>
          <div>Edit any existing A Records with Host Name @</div>
          <div>
            Do not edit or delete A-Records for Mail or Email as it could
            interfere with your email service.{" "}
          </div>
          <div>
            An example of A-records with the IP address we shall provide you;
          </div>
          <ul>
            <li>A-Record: 3.209.XX.XX</li>
            <li>Host or Name: @</li>
            <li>Points To: 3.209.XX.XX</li>
            <li>TTL: 1 Hour</li>
            <li>Click: Save</li>
          </ul>
          <div>
            <strong>Note:</strong> DNS settings may look different for each
          </div>
        </div>
      </div>
      <div className="Description__button">
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  </div>
);

export default DomainInstructionsContent;
