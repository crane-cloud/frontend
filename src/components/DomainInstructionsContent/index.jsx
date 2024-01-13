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
            Add an A-record inorder to use your root domain(i.e custom domain).
          </div>
          <div>Edit any existing A Records with Host Name @</div>
          <div>
            Do not edit or delete A-Records for Mail or Email as it could
            interfere with your email service.{" "}
          </div>
          <br />
          <div>
            On your DNS provider, enter the following information for your
            service:
          </div>
          <ul>
            <li>Record Type: A</li>
            <li>Host: app [This will point to your domain]</li>
            <li>
              Address/Value: 102.134.147.233 [This is an example IP address we
              provide]
            </li>
          </ul>

          <div>
            Another example of A-records using the IP address we shall provide
            you;
          </div>
          <ul>
            <li>A-Record: 102.134.147.233</li>
            <li>Host or Name: @</li>
            <li>Points To: 102.134.147.233</li>
            <li>TTL: 1 Hour</li>
            <li>Click: Save</li>
          </ul>
          <div>
            <strong>Note:</strong> DNS settings may look different for different
            domain providers
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
