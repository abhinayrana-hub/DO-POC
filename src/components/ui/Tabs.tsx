type TabsProps = {
  activeTab: string
  onChange: (tab: string) => void
  tabs: string[]
}

export function Tabs({ activeTab, onChange, tabs }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Dashboard views">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
