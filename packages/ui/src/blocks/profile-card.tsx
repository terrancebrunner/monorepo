import { Avatar, 
  AvatarFallback, 
  AvatarImage, 
  Badge, 
  Button, 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader  } from "../primitives"
import { Code, GitBranch, Mail, Users } from 'lucide-react'

interface ProfileCardProps {
  name: string
  role: string
  avatarUrl: string
  skills: string[]
  recentActivity: string
  team: string
  email: string
}

export default function ProfileCard({
  name,
  role,
  avatarUrl,
  skills,
  recentActivity,
  team,
  email
}: ProfileCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              <Code className="mr-1 h-3 w-3" />
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <GitBranch className="h-4 w-4 text-muted-foreground" />
          <span>Recent activity: {recentActivity}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>Team: {team}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  )
}
