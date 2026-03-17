function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
