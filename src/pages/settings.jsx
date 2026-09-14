import { Button } from '@/components/ui/button'

export default function Settings() {
  return (
    <section className="page">
      <article className="card settings-card">
        <div className="card-header">
          <h2>Workspace</h2>
          <span>Admin defaults</span>
        </div>
        <form className="settings-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Firm name
            <input defaultValue="Northline Capital" />
          </label>
          <label>
            Default venue
            <select defaultValue="NYSE">
              <option>NYSE</option>
              <option>NASDAQ</option>
              <option>CME</option>
            </select>
          </label>
          <label>
            Risk limit
            <input defaultValue="250000" />
          </label>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            Require dual approval for orders above $50,000
          </label>
          <Button type="submit">Save changes</Button>
        </form>
      </article>
    </section>
  )
}
